import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElementAngularComponent } from "./element-angular.component";
import { LayoutComponent } from "./layout/layout.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ElModule } from "element-angular";
import { ElFormComponent } from "./el-form/el-form.component";

const routes: Routes = [


  {
    path: "", component: ElementAngularComponent,
    children: [
      {
        path: "layout",
        // canActivate: [ContentGuard],
        component: LayoutComponent,
        children: [
          {
            path: "el-form",
            component: ElFormComponent
          },
        ],

        data: {}
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, ElModule.forRoot()],
  exports: [RouterModule],
  declarations: [LayoutComponent, ElementAngularComponent, ElFormComponent]
})
export class ElementAngularModule { }
