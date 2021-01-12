import {Component, OnInit} from '@angular/core';
import {StoreService} from '../@themes/core/store.service';
import {Utils} from '../@themes/core/utils';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
    currentStep = -1;
    maxStep = 0;
    currentNew: any;
    private destroy$: Subject<void> = new Subject<void>();


    constructor(private store: StoreService) {

    }

    ngOnInit() {
        this.maxStep = this.store.getMaxStep();
        this.timeUpdate
            .pipe()
            .subscribe(res => {
                this.generateOffers();
            });
        this.generateOffers();
        this.progressUpdate.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (this.currentStep >= this.maxStep) {
                this.destroy$.next();
                this.destroy$.complete();
                return;
            }
            this.currentNew = this.store.currentNew();
            this.progressbarSeconds -= 1;
            this.progressbarValue -= this.progressbarValue / this.progressbarSeconds - 1;
        });
    }

    generateOffers() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.currentStep >= this.maxStep) {
            return;
        }
        this.currentNew = this.store.randomNew();
        this.progressbarValue = 100;
        this.progressbarSeconds = 30;
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
        ]);
        this.store.getCurrentStep().subscribe((step: number) => {
            this.maxStep = this.store.getMaxStep();
            if (this.currentStep >= this.maxStep) {
                this.destroy$.next();
                this.destroy$.complete();
                return;
            }
            this.currentStep = step || 1;
            this.currentStep += 1;
            this.store.setCurrentStep(this.currentStep);
        });
    }

    offerBy(offer: any) {
        this.store.addProperty(offer);
        this.offers.splice(this.offers.indexOf(offer), 1);
    }

    refresh() {
        window.location.reload();
    }
}
