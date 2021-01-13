import {Component, OnInit} from '@angular/core';
import {StoreService} from '../../core/store.service';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: 'app-charts-view',
    templateUrl: './charts-view.component.html',
    styleUrls: ['./charts-view.component.scss'],
})
export class ChartsViewComponent implements OnInit {
    options: any = {};
    steps = [];
    value = [];

    constructor(private store: StoreService,
                private currencyPipe: CurrencyPipe) {
    }

    ngOnInit() {
        this.store.tikEndChange.subscribe(step => {
            this.initData();
        });
        this.initData();
    }

    initData() {
        let budgetChartItems = this.store.getBudgetChartItems();
        this.steps = [];
        this.value = [];
        budgetChartItems.forEach(item => {
            this.steps.push(`${item.step}`);
            this.value.push(Math.round((item.budget + Number.EPSILON) * 100) / 100);
        });
        this.options = {
            backgroundColor: '#ffffff',
            color: ['#1221ff'],
            legend: {
                data: ['Budget'],
                align: 'left',
                textStyle: {
                    color: '#1221ff',
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },

            xAxis: [
                {
                    data: this.steps,
                    silent: false,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#1221ff',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#363557',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#1221ff',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#000000',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#363557',
                        },
                    },
                },
            ],
            series: [
                {
                    name: 'Budget',
                    type: 'bar',
                    barWidth: '90%',
                    data: this.value,
                    animationDelay: idx => idx * 10,
                },
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
        };
    }

}
