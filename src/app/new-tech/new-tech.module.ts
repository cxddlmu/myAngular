import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTechComponent } from './new-tech.component';
import { RouterModule, Routes } from '@angular/router';
import { IronDBComponent } from './IronDB/IronDB.component';
import { RxjsComponent } from './rxjs/rxjs.component';
const routes: Routes = [
  { path: "ironDB", component: IronDBComponent },
{ path: "rxjs", component: RxjsComponent },
{ path: "", component: IronDBComponent },


];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  declarations: [NewTechComponent,IronDBComponent,RxjsComponent],
})


export class NewTechModule { }
