import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {

    @Input() offer: any;
    @Output() buyClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

}
