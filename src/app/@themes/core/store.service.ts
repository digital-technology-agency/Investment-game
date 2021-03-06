import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Logger} from './logger-service';
import {HttpClient} from '@angular/common/http';
import {Utils} from './utils';

const log = new Logger(`store`);

@Injectable({
    providedIn: 'root',
})
export class StoreService {

    maxStep = 365;
    news: any[] = [];
    @Output() addPropertyChange: EventEmitter<any> = new EventEmitter();
    @Output() removePropertyChange: EventEmitter<any> = new EventEmitter();
    @Output() stepEndChange: EventEmitter<any> = new EventEmitter();
    @Output() tikEndChange: EventEmitter<any> = new EventEmitter();
    @Output() tikCoefficientEndChange: EventEmitter<any> = new EventEmitter();
    @Output() sellPropertyChange: EventEmitter<any> = new EventEmitter();


    constructor(private http: HttpClient) {
        this.http.get('assets/news.json').subscribe((resp: any[]) => {
            this.news = resp;
        });
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

    public setCurrentStep(val: any) {
        localStorage.setItem(`${environment.prefixField}currentStep`, val);
        let budget = Number.parseFloat(localStorage.getItem(`${environment.prefixField}budget`));
        if (!budget) {
            budget = 0.0;
        }
        let properties: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}property`));
        if (!properties) {
            properties = [];
        }
        let propertiesChartItems: any[] = this.getPropertyChartItems();
        propertiesChartItems.push({step: val, propertyCount: properties.length});
        localStorage.setItem(`${environment.prefixField}property-charts`, JSON.stringify(propertiesChartItems));

        let budgetChartItems: any[] = this.getBudgetChartItems();
        let item = {step: val, budget: budget};
        budgetChartItems.push(item);
        localStorage.setItem(`${environment.prefixField}budget-charts`, JSON.stringify(budgetChartItems));
        this.tikEndChange.emit(item);
    }

    public getPropertyChartItems(): any[] {
        let chartItems: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}property-charts`));
        if (!chartItems) {
            chartItems = [];
        }
        return chartItems;
    }

    public getBudgetChartItems(): any[] {
        let budgetChartItems: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}budget-charts`));
        if (!budgetChartItems) {
            budgetChartItems = [];
        }
        return budgetChartItems;
    }

    public getMaxStep(): number {
        let maxStep = Number.parseInt(localStorage.getItem(`${environment.prefixField}maxStep`));
        if (!maxStep) {
            maxStep = this.maxStep;
            this.setMaxStep(this.maxStep);
        }
        return maxStep;
    }

    public setMaxStep(val: any) {
        localStorage.setItem(`${environment.prefixField}maxStep`, val);

    }

    public randomNew(): any {
        let randomIndex = Utils.getRandomMinMax(0, this.news.length);
        let currentNew = this.news[randomIndex];
        localStorage.setItem(`${environment.prefixField}currentNew`, JSON.stringify(currentNew));
        return currentNew;
    }

    public currentNew(): any {
        let item: any = localStorage.getItem(`${environment.prefixField}currentNew`) || null;
        if (item === 'undefined') {
            return this.randomNew()
        }
        return JSON.parse(item);
    }

    public getCurrentStep() {
        return new Observable(subscriber => {
            const step = Number.parseInt(localStorage.getItem(`${environment.prefixField}currentStep`));
            return subscriber.next(step);
        });
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
        this.addPropertyChange.emit(item);
    }

    public setProperty(val: any[]) {
        let item = JSON.stringify(val);
        localStorage.setItem(`${environment.prefixField}property`, item);
    }

    public sellProperty(val: any, price: number) {
        let item: any[] = JSON.parse(localStorage.getItem(`${environment.prefixField}property`));
        if (!item) {
            item = [];
        }
        item.splice(item.indexOf(val), 1);
        this.budgetAdd(price);
        this.setProperty(item);
        this.sellPropertyChange.emit(item);
    }

    public restart() {
        localStorage.clear();
    }

}
