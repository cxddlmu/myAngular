import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ElModule } from "element-angular";
import { AppRoutingModule } from ".//app-routing.module";
import { AngularCoreModule } from "./angular-core/angular-core.module";
import { SharedModule } from "./shared/shared.module";
import { SortablejsModule } from 'angular-sortablejs'
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorComponent } from "./shared/interceptor/interceptor.component";
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
    ElModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: InterceptorComponent, multi: true },
  bootstrap: [AppComponent]
})
export class AppModule {}
