import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { mainRoutes } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent,
        RouterModule
    ],
    providers: [
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(mainRoutes),
        AngularMaterialModule
    ],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainModule { }
