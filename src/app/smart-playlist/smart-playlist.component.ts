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
            title: 'Git - High Resolution',
            src: 'https://zencoder-temp-storage-us-east-1.s3.amazonaws.com/o/20190912/745b777583aabf06c0b41df72ef383c1/a51d4207137a435ca05458ccfd709ee8.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI456JQ76GBU7FECA%2F20190912%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190912T050405Z&X-Amz-Expires=86399&X-Amz-SignedHeaders=host&X-Amz-Signature=bf7611b863b34aeaa9459ccf83e2664a4f9eac8dfe44d53c9945f260e3420784',
            type: 'video/mp4'
        },
        {
            title: 'Git - Mobile',
            src: 'https://zencoder-temp-storage-us-east-1.s3.amazonaws.com/o/20190912/272f86045b7b5a69865e5cfde1e0aa69/f8b70062756f16464f8682337e0c59df.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI456JQ76GBU7FECA%2F20190912%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190912T060211Z&X-Amz-Expires=85982&X-Amz-SignedHeaders=host&X-Amz-Signature=e24c157d52415a9ae9174c89ba8a41ced57124e64a47246d71fecfc0161656a6',
            type: 'video/mp4'
        },
        {
            title: 'Screen Recorder',
            src: 'https://zencoder-temp-storage-us-east-1.s3.amazonaws.com/o/20190912/ee2100a6851e046f32128d83e91bc3aa/7c625574c42f5f500135df534e9947e1.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI456JQ76GBU7FECA%2F20190912%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190912T051949Z&X-Amz-Expires=86399&X-Amz-SignedHeaders=host&X-Amz-Signature=95f5fb35434d45c02fe07446db0d10c2df5d9ac2e12ca90a753d5e757960c4f4',
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