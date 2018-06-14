import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementAngularComponent } from './element-angular.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElementAngularComponent,
    LayoutComponent
]
})
export class ElementAngularModule { }
