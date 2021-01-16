import {Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../../core/store.service';
import {Logger} from '../../core/logger-service';
import {MatSort} from '@angular/material/sort';

const log = new Logger(`property-list`);

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'price', 'perSecond', 'sell', 'income'];
    properties: any[] = [];

    @ViewChild("sort", {static: true}) sort: MatSort;


    constructor(private store: StoreService) {

    }

    ngOnInit() {
        this.store.property().subscribe(resp => {
            this.properties = resp;
        });
        this.store.addPropertyChange.subscribe(prop => {
            this.properties = prop;
        });
        this.store.tikCoefficientEndChange.subscribe((coeff: number) => {
            this.properties.forEach(prop => {
                if (Number.isNaN(prop.income)) {
                    prop.income = 0.0;
                }
                prop.income += prop.perSecond * coeff;
                log.debug(prop, coeff);
            });
            this.store.setProperty(this.properties);
        });
    }

    sell(item: any) {
        this.store.sellProperty(item, this.sellPrice(item));
        this.properties.splice(this.properties.indexOf(item), 1);
        this.properties = [...this.properties];
    }

    companyResell(offer: any) {
        return offer.income > offer.price;
    }

    sellPrice(offer: any) {
        if (offer.income > offer.price) {
            return (offer.price * (1 + offer.perSecond)) + (offer.income - offer.price);
        } else {
            return offer.price * (1 - offer.perSecond);
        }
    }

}
