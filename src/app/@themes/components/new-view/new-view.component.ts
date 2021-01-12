import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-new-view',
    templateUrl: './new-view.component.html',
    styleUrls: ['./new-view.component.scss'],
})
export class NewViewComponent implements OnInit {

    @Input() currentNew: any;


    constructor() {
    }

    ngOnInit() {

    }

    get iconType() {
        if (!this.currentNew) {
            return;
        }
        return this.currentNew.coeff > 0.0 ? 'up' : 'down';
    }

}
