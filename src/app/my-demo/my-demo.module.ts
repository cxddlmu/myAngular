import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDemoComponent } from './my-demo.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ClockComponent } from './clock/clock.component';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";

const routes: Routes = [
  {
    path: "", component: MyDemoComponent,
}];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [MyDemoComponent,HeaderComponent,ClockComponent]
})
export class MyDemoModule { }

