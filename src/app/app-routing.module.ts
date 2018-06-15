import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElementAngularModule } from "./element-angular/element-angular.module";
const routes: Routes = [
  // { path: 'heroes', component:  ''}
  {
    path: "element-angular",
    // canActivate: [ContentGuard],
    loadChildren:
      "app/element-angular/element-angular.module#ElementAngularModule",
    data: {}
  },
  {
    path: "index.html",
    redirectTo: "/element-angular/layout",
    pathMatch: "prefix"
  },
  { path: "", redirectTo: "/element-angular/layout", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
