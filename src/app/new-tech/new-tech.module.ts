import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTechComponent } from './new-tech.component';
import { RouterModule, Routes } from '@angular/router';
import { IronDBComponent } from './IronDB/IronDB.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MagicGridComponent } from './magic-grid/magic-grid.component';
import { StringSimilarityComponent } from './string-similarity/string-similarity.component';
const routes: Routes = [
  {
    path: "", component: NewTechComponent,
    children: [
          { path: "ironDB", component: IronDBComponent },
        { path: "rxjs", component: RxjsComponent },
        { path: "stringSimilarity", component: StringSimilarityComponent },
         { path: "magicGrid", component: MagicGridComponent }

    ]
}];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  declarations: [NewTechComponent,IronDBComponent,MagicGridComponent
  ,RxjsComponent,StringSimilarityComponent],
})


export class NewTechModule { }
