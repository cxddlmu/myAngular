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
import { AtomSpinnerModule } from 'angular-epic-spinners'
import { BasicComponent } from './basic/basic.component';
import { PortalComponent, ComponentPortalExample } from './portal/portal.component';
import { FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';

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
      }, {
        path: "family",
        // canActivate: [ContentGuard],
        component: FamilyComponent,
        data: {}
      },
      {
        path: "basic",
        // canActivate: [ContentGuard],
        component: BasicComponent,
        data: {}
      },
      {
        path: "portal",
        // canActivate: [ContentGuard],
        component: PortalComponent,
        data: {}
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, AtomSpinnerModule, FormsModule, PortalModule
  ],
  exports: [RouterModule],
  declarations: [AngularCoreComponent, FatherComponent, MotherComponent, GrandfatherComponent,
    GrandmotherComponent,
    DaughterComponent, SonComponent, FamilyComponent,
    BasicComponent,
    PortalComponent,ComponentPortalExample
  ],
  entryComponents:[ComponentPortalExample],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AngularCoreModule { }
