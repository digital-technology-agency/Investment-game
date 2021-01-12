import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../core/store.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-social-share-btn',
    templateUrl: './social-share-btn.component.html',
    styleUrls: ['./social-share-btn.component.scss'],
})
export class SocialShareBtnComponent implements OnInit {

    @Input() titleButton;
    @Input() siteUrl;
    @Input() title;
    @Input() image;
    @Input() shareSite;
    @Input() content;

    constructor(private store: StoreService) {
    }

    ngOnInit() {
    }

    get url() {
        const step = Number.parseInt(localStorage.getItem(`${environment.prefixField}currentStep`));
        this.content = `День: ${step}`;
        return `${this.shareSite}url=${this.siteUrl}&title=${this.title}&image=${this.image}&comment=${this.content}`;
    }
}
