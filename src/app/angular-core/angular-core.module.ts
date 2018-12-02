import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCoreComponent } from './angular-core.component';
import { Routes, RouterModule } from '@angular/router';
import { FatherComponent } from './father/father.component';
import { MotherComponent } from './mother/mother.component';
import { GrandmotherComponent } from './grandmother/grandmother.component';
import { GrandfatherComponent } from './grandfather/grandfather.component';
import { DaughterComponent } from './daughter/daughter.component';
import { SonComponent } from './son/son.component';
import { FamilyComponent } from './family/family.component';
import { SharedModule } from '../shared/shared.module';
  import {AtomSpinnerModule} from 'angular-epic-spinners'

const routes: Routes = [


  {
    path: "", component: AngularCoreComponent,
    children: [
      {
        path: "father",
        // canActivate: [ContentGuard],
        component: FatherComponent,
        data: {}
      }, {
        path: "grandfather",
        // canActivate: [ContentGuard],
        component: GrandfatherComponent,
        data: {}
      }, {
        path: "grandmother",
        // canActivate: [ContentGuard],
        component: GrandmotherComponent,
        data: {}
      }, {
        path: "mother",
        // canActivate: [ContentGuard],
        component: MotherComponent,
        data: {}
      }, {
        path: "son",
        // canActivate: [ContentGuard],
        component: SonComponent,
        data: {}
      }, {
        path: "daughter",
        // canActivate: [ContentGuard],
        component: DaughterComponent,
        data: {}
      },{
        path: "family",
        // canActivate: [ContentGuard],
        component: FamilyComponent,
        data: {}
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule,AtomSpinnerModule
  ],
  exports: [RouterModule],
  declarations: [AngularCoreComponent, FatherComponent, MotherComponent, GrandfatherComponent,
    GrandmotherComponent,
    DaughterComponent, SonComponent,FamilyComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AngularCoreModule { }
