import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import { OfferComponent } from './components/offer/offer.component';
import { NewViewComponent } from './components/new-view/new-view.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbIconModule} from '@nebular/theme';

const COMPONENTS = [
    HeaderComponent, FooterComponent, ContentViewComponent, SimpleComponent,
];

@NgModule({
    declarations: [...COMPONENTS, OfferComponent, NewViewComponent],
    exports: [CommonModule, ...COMPONENTS, OfferComponent, NewViewComponent],
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
    ],
})
export class ThemeModule {
}
