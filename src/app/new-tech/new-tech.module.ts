import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTechComponent } from './new-tech.component';
import { RouterModule, Routes } from '@angular/router';
import { IronDBComponent } from './IronDB/IronDB.component';
const routes: Routes = [
  { path: "ironDB", component: IronDBComponent },



];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  declarations: [NewTechComponent],
})


export class NewTechModule { }
