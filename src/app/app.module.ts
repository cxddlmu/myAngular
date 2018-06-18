import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ElModule } from "element-angular";
import { AppRoutingModule } from ".//app-routing.module";
import { AngularCoreModule } from "./angular-core/angular-core.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularCoreModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ElModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
