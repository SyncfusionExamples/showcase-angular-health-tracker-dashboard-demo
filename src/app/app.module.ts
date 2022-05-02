import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartAllModule, AccumulationChartAllModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { LinearGaugeAllModule } from '@syncfusion/ej2-angular-lineargauge';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabModule,
    DatePickerModule,
    ChartAllModule,
    GridModule,
    DashboardLayoutModule,
    ProgressBarAllModule,
    DropDownListModule,
    LinearGaugeAllModule,
    AccumulationChartAllModule,
    ButtonAllModule,
    DialogAllModule,
    CircularGaugeAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
