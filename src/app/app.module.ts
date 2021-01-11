import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {Overlay, OverlayContainer, ToastrModule, ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeModule} from './@themes/theme.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {A11yModule} from '@angular/cdk/a11y';
import {MatCommonModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MainViewComponent } from './main-view/main-view.component';

const MATERIAL_MODULES = [
    MatCommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
];

@NgModule({
    declarations: [
        AppComponent,
        MainViewComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ClipboardModule,
        ToastrModule.forRoot(),
        OverlayModule,
        PortalModule,
        ScrollingModule,
        A11yModule,
        ...MATERIAL_MODULES,
        ThemeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
