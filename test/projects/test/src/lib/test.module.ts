import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { testComponent } from './components/test.component';
import { RouterModule, Routes } from '@angular/router';

import {MaterialModule} from './modules/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {FormsModule} from '@angular/forms';

const routes: Routes = [
    { path: '', component: testComponent }
];

@NgModule({
    declarations: [testComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    exports: [testComponent]
})
export class testModule { }
