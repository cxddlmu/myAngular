import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElementAngularComponent } from "./element-angular.component";
import { LayoutComponent } from "./layout/layout.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  // { path: 'heroes', component:  ''}
  {
    path: "layout",
    // canActivate: [ContentGuard],
    component: LayoutComponent,
    data: {}
  },
  { path: "", component: LayoutComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [LayoutComponent, ElementAngularComponent]
})
export class ElementAngularModule {}
