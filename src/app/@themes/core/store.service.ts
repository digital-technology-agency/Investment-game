import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StoreService {

    constructor() {
    }

    public budget(): Observable<any> {
        return new Observable(subscriber => {
            const budget = Number.parseFloat(sessionStorage.getItem(`${environment.prefixField}budget`));
            return subscriber.next(budget);
        });
    }

    public setBudget(val: any) {
        sessionStorage.setItem(`${environment.prefixField}budget`, val);
    }

}
