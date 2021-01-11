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

const COMPONENTS = [
    HeaderComponent, FooterComponent, ContentViewComponent, SimpleComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [CommonModule, ...COMPONENTS],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
    ],
})
export class ThemeModule {
}
