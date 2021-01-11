import {Component, OnInit} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {StoreService} from '../../core/store.service';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html',
    styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {

    budgets: number = 0.0;
    budgetUpdateTimer = interval(1000);
    private budgetChange: Subject<void> = new Subject<void>();

    constructor(private store: StoreService) {

    }

    ngOnInit() {
        this.store.budget().subscribe(res => {
            this.budgets = res || 0.0;
        });
        this.budgetUpdateTimer.pipe().subscribe(res => {
            this.budgets += 0.01;
            this.store.setBudget(this.budgets);
        });
    }
}
