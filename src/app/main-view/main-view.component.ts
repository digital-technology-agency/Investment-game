import {Component, OnInit} from '@angular/core';
import {StoreService} from '../@themes/core/store.service';
import {Utils} from '../@themes/core/utils';
import {interval} from 'rxjs';

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {

    offers: any[] = [];
    progressbarSeconds = 30;
    timeUpdate = interval(this.progressbarSeconds * 1000);
    progressUpdate = interval(1000);
    progressbarValue = 0;


    constructor(private store: StoreService) {

    }

    ngOnInit() {
        this.timeUpdate
            .pipe()
            .subscribe(res => {
                this.generateOffers();
            });
        this.generateOffers();
    }


    generateOffers() {
        this.progressbarValue = 100;
        this.progressbarSeconds = 30;
        this.progressUpdate.pipe().subscribe(res => {
            this.progressbarSeconds -= 1;
            this.progressbarValue -= 1;
        });
        this.offers = [];
        this.offers.push(...[
            {
                name: `Firm ${Utils.getRandomMinMax(1, 999)}`,
                desc: 'desc-1',
                perSecond: Utils.RandomMinMax(0.01, 0.5),
                price: Utils.getRandomMinMax(100, 1000),
            },
            {
                name: `Firm ${Utils.getRandomMinMax(1, 999)}`,
                desc: 'desc-2',
                perSecond: Utils.RandomMinMax(0.01, 0.5),
                price: Utils.getRandomMinMax(300, 1000),
            },
            {
                name: `Firm ${Utils.getRandomMinMax(1, 999)}`,
                desc: 'desc-3',
                perSecond: Utils.RandomMinMax(0.01, 0.5),
                price: Utils.getRandomMinMax(400, 1000),
            },
        ])
    }

    offerBy(offer: any) {
        this.store.addProperty(offer);
        this.offers.splice(this.offers.indexOf(offer), 1);
    }

}
