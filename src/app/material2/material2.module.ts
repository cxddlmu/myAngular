import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material2Component } from './material2.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [


  {
    path: "", component: Material2Component,
  }
];
@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule,
  ],
  declarations: [Material2Component]
})
export class Material2Module { }