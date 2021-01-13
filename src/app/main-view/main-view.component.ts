import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../@themes/core/store.service';
import {Utils} from '../@themes/core/utils';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as PIXI from 'pixi.js'
import {Logger} from '../@themes/core/logger-service';

const log = new Logger(`app-simple`);

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit, OnDestroy {

    offers: any[] = [];
    timeout = 30;
    progressbarSeconds = this.timeout;
    timeUpdate = interval(this.progressbarSeconds * 1000);
    progressUpdate = interval(1000);
    progressbarValue = 0;
    currentStep = -1;
    maxStep = 0;
    currentNew: any;
    private destroy$: Subject<void> = new Subject<void>();
    app: PIXI.Application;
    barSize = 50;

    @ViewChild("appPixi", {static: false})
    appViewTag: ElementRef;


    constructor(private store: StoreService) {
        /*        this.app = new PIXI.Application({
                    transparent: true,
                    antialias: true,
                    width: window.innerWidth - 200,
                    height: 300,
                });
                this.appViewTag.nativeElement.appendChild(this.app.view);
                this.app.stage.interactive = true;*/
        /*        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFF3300)
            .lineStyle(3, 0xffd900, 1)
            .drawRect(this.barSize+=10, this.barSize, 50, 250)
            .endFill();
        this.app.stage.addChild(graphics);*/
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

    ngOnDestroy(): void {
        log.debug('destr');
        this.destroy$.next();
        this.destroy$.complete();
    }

    addBar() {

    }

    generateOffers() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.currentStep >= this.maxStep) {
            return;
        }
        this.currentNew = this.store.randomNew();
        this.progressbarValue = 100;
        this.progressbarSeconds = this.timeout;
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
            this.addBar();
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
