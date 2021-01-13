import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ContentViewComponent} from './components/content-view/content-view.component';
import {SimpleComponent} from './layouts/simple/simple.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {OfferComponent} from './components/offer/offer.component';
import {NewViewComponent} from './components/new-view/new-view.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbIconModule} from '@nebular/theme';
import {SocialShareBtnComponent} from './components/social-share-btn/social-share-btn.component';
import {PropertyListComponent} from './components/property-list/property-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {ChartsViewComponent} from './components/charts-view/charts-view.component';
import {NgxEchartsModule} from 'ngx-echarts';

const COMPONENTS = [
    HeaderComponent, FooterComponent, ContentViewComponent, SimpleComponent,
];

@NgModule({
    declarations: [...COMPONENTS, OfferComponent, NewViewComponent, SocialShareBtnComponent, PropertyListComponent, ChartsViewComponent],
    exports: [CommonModule, ...COMPONENTS, OfferComponent, NewViewComponent, PropertyListComponent, ChartsViewComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        NbEvaIconsModule,
        NbIconModule,
        ScrollingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NgxEchartsModule,
    ],
})
export class ThemeModule {
}
