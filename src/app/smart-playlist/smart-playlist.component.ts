import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VgAPI } from 'videogular2/core';
import { Subscription } from 'rxjs/Subscription';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({
    selector: 'app-smart-playlist',
    templateUrl: './smart-playlist.component.html',
    styleUrls: [ './smart-playlist.component.css' ]
})
export class SmartPlaylistComponent implements OnInit {

    @HostBinding('class')
    isStandalone = '';

    subscriptions: Subscription[] = [];

    playlist: Array<IMedia> = [
        {
            title: 'My Welcome Video',
            src: 'http://mande-dev.com/static/TestVideoAboutSite.mp4',
            type: 'video/mp4'
        },
        {
            title: 'Random Giant Bunny',
            src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
            type: 'video/mp4'
        },
        {
            title: 'Elephants Dream',
            src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
            type: 'video/mp4'
        }
    ];

    currentIndex = 0;
    currentItem: IMedia = this.playlist[ this.currentIndex ];
    api: VgAPI;

    constructor(private route: ActivatedRoute) {
    
    }

    ngOnInit() {
        this.subscriptions.push(
            this.route.queryParams
                .subscribe((params: any) => {
                    if (params.standalone === 'true') {
                        this.isStandalone = 'is-standalone';
                    }
                })
        );
    }

    onPlayerReady(api: VgAPI) {
        // this.isStandalone = 'is-standalone';
        this.api = api;
        this.api.getDefaultMedia()
        .subscriptions.loadedMetadata
        .subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    nextVideo() {
        this.currentIndex++;

        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.playlist[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMedia, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
    }
}