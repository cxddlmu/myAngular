import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElementAngularModule } from "./element-angular/element-angular.module";
const routes: Routes = [
  // { path: 'heroes', component:  ''}
  {
    path: "element-angular",
    // canActivate: [ContentGuard],
    loadChildren:
      "./element-angular/element-angular.module#ElementAngularModule",
    data: {}
  },
  {
    path: "form",
    // canActivate: [ContentGuard],
    loadChildren:
      "./form/form.module#FormModule",
    data: {}
  },
  {
    path: "angular-core",
    // canActivate: [ContentGuard],
    loadChildren:
      "./angular-core/angular-core.module#AngularCoreModule",
    data: {}
  },
  {
    path: "index.html",
    redirectTo: "/element-angular/layout",
    pathMatch: "prefix"
  },
  {
    path:'new-tech',
    loadChildren:"./new-tech/new-tech.module#NewTechModule",
    data:{}
  },
    {
    path:'material2',
    loadChildren:"./material2/material2.module#Material2Module",
    data:{}
  }
  // { path: "", redirectTo: "/element-angular/layout", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
