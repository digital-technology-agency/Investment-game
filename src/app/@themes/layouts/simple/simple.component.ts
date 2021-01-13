import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {StoreService} from '../../core/store.service';
import {Logger} from '../../core/logger-service';
import {filter, map, takeUntil} from 'rxjs/operators';

const log = new Logger(`app-simple`);

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit, OnDestroy {

    budgets: number = 0.0;
    property: any[] = [];
    maxStep = 30;
    currentStep = 0;
    currentNew: any;

    timeUpdate = interval(1000);
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private store: StoreService) {
    }

    ngOnInit() {
        this.maxStep = this.store.getMaxStep();
        this.store.budget().subscribe(res => {
            this.budgets = res;
        });
        this.store.property().subscribe(res => {
            this.property = res || [];
        });
        this.store.getCurrentStep().subscribe((step: number) => {
            this.currentStep = step;
        });
        this.timeUpdate
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.store.property()
                    .pipe(
                        takeUntil(this.destroy$),
                        filter(f => f && f.length),
                        map(m => m.map(i => i.perSecond)))
                    .subscribe((perSeconds: number[]) => {
                        this.store.getCurrentStep().subscribe((step: number) => {
                            this.currentStep = step;
                            if (this.currentStep >= this.maxStep) {
                                this.destroy$.next();
                                this.destroy$.complete();
                                return;
                            }
                            this.store.budget().subscribe(res => {


                                this.budgets = res;
                                let reduce = perSeconds.reduce((a, b) => a + b);
                                /*news*/
                                this.currentNew = this.store.currentNew();
                                let coefficient = 1.00 + this.currentNew.coeff;
                                this.budgets += reduce * coefficient;
                                this.store.tikCoefficientEndChange.emit(coefficient);
                                this.store.setBudget(this.budgets);
                            });
                        });
                    });
            });
    }

    ngOnDestroy(): void {
        log.debug('destr');
        this.destroy$.next();
        this.destroy$.complete();
    }

    restart() {
        this.store.restart();
        window.location.reload();
    }
}
