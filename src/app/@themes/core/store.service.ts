import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Logger} from './logger-service';

const log = new Logger(`store`);

@Injectable({
    providedIn: 'root',
})
export class StoreService {

    constructor() {
    }

    public budget(): Observable<any> {
        return new Observable(subscriber => {
            const budget = Number.parseFloat(localStorage.getItem(`${environment.prefixField}budget`));
            return subscriber.next(budget);
        });
    }

    public budgetAdd(value: number) {
        let budget = Number.parseFloat(localStorage.getItem(`${environment.prefixField}budget`));
        if (!budget) {
            budget = 100.0;
        }
        budget += value;
        this.setBudget(budget);
    }

    public setBudget(val: any) {
        localStorage.setItem(`${environment.prefixField}budget`, val);
    }

    public property(): Observable<any> {
        return new Observable(subscriber => {
            let item: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}property`));
            return subscriber.next(item);
        });
    }

    public addProperty(val: any) {
        let item: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}property`));
        if (!item) {
            item = [];
        }
        this.budgetAdd(-val.price);
        item.push(val);
        this.setProperty(item);
    }

    public setProperty(val: any[]) {
        let item = JSON.stringify(val);
        localStorage.setItem(`${environment.prefixField}property`, item);
    }

}
