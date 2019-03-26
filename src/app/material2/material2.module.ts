import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material2Component } from './material2.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { Material2FormComponent } from './material2Form/material2Form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [


  {
    path: "", component: Material2Component,
    children: [
      {
        path: "material2Form",
        // canActivate: [ContentGuard],
        component: Material2FormComponent,
        data: {}
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule,FlexLayoutModule
  ],
  declarations: [Material2Component,
    Material2FormComponent
  ]
})
export class Material2Module { }
