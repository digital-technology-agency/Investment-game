import {Component, OnInit} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {StoreService} from '../../core/store.service';
import {Logger} from '../../core/logger-service';
import {filter, flatMap, map, pluck, reduce, tap} from 'rxjs/operators';

const log = new Logger(`app-simple`);

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {

    budgets: number = 0.0;
    property: any[] = [];

    timeUpdate = interval(1000);
    private budgetChange: Subject<void> = new Subject<void>();

    constructor(private store: StoreService) {

    }

    ngOnInit() {
        this.store.budget().subscribe(res => {
            this.budgets = res;
        });
        this.store.property().subscribe(res => {
            this.property = res || [];
        });
        this.timeUpdate
            .pipe()
            .subscribe(res => {
                this.store.property()
                    .pipe(
                        filter(f => f && f.length),
                        map(m => m.map(i => i.perSecond)))
                    .subscribe((perSeconds: number[]) => {
                        this.store.budget().subscribe(res => {
                            this.budgets = res;
                            let reduce = perSeconds.reduce((a, b) => a + b);
                            this.budgets += reduce;
                            this.store.setBudget(this.budgets);
                        });
                    });
            });
    }
}
