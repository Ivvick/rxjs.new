import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from "primeng/tabview";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from 'primeng/table';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';

@NgModule({
    declarations: [
        SettingsComponent,
        ChangePasswordComponent,
        StatisticComponent,
        TourLoaderComponent
    ],
    exports: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        ToastModule,
        TabViewModule,
        TableModule
    ]
})
export class SettingsModule { }
