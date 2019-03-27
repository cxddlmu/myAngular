import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTechComponent } from './new-tech.component';
import { RouterModule, Routes } from '@angular/router';
import { IronDBComponent } from './IronDB/IronDB.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MagicGridComponent } from './magic-grid/magic-grid.component';
import { StringSimilarityComponent } from './string-similarity/string-similarity.component';
import { JsPDFComponent } from './jsPDF/jsPDF.component';
import { SharedModule } from '../shared/shared.module';
import { SortableJSComponent } from './sortableJS/sortableJS.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { GliderComponent } from './glider/glider.component';
import { HotkeysComponent } from './hotkeys/hotkeys.component';
import { AnimejsComponent } from './animejs/animejs.component';
import { AlasqlComponent } from './alasql/alasql.component';
import { UppyComponent } from './uppy/uppy.component';
import { NgrxStoreComponent } from './ngrxStore/ngrxStore.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrxStore/ngrxStore.component';
import { NgrxStoreService } from './ngrxStore/ngrxStore.service';
import { NgrxEffectsService } from './ngrxStore/ngrxEffects.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from 'src/app/new-tech/ngrxStore/router-state.serializer';
// import { LodashComponent } from './lodash/lodash.component';
import { FuseComponent } from './fuse/fuse.component';
import { DayjsComponent } from './dayjs/dayjs.component';
// import { RythmComponent } from './rythm/rythm.component';
import { CssComponent } from './css/css.component';

const routes: Routes = [
  {
    path: "", component: NewTechComponent,
    children: [
      { path: "ironDB", component: IronDBComponent },
      { path: "rxjs", component: RxjsComponent },
      { path: "stringSimilarity", component: StringSimilarityComponent },
      { path: "magicGrid", component: MagicGridComponent },
      { path: "jsPDF", component: JsPDFComponent },
      { path: "sortableJS", component: SortableJSComponent },
      { path: "glider", component: GliderComponent },
      { path: "hotkeys", component: HotkeysComponent },
      { path: "animejs", component: AnimejsComponent },
      { path: "alasql", component: AlasqlComponent },
      { path: "uppy", component: UppyComponent },
      { path: "ngrxstore", component: NgrxStoreComponent },
      // { path: "lodash", component: LodashComponent },
      { path: "fuse", component: FuseComponent },
      { path: "dayjs", component: DayjsComponent },
      // { path: "rythm", component: RythmComponent },
      { path: "css", component: CssComponent },

    ]
  }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule, SortablejsModule,
    StoreModule.forRoot({ countroot: counterReducer }), EffectsModule.forRoot([NgrxEffectsService]),
    StoreRouterConnectingModule,
  ],
  declarations: [NewTechComponent, IronDBComponent, MagicGridComponent
    , RxjsComponent, StringSimilarityComponent,
    JsPDFComponent,
    SortableJSComponent,
    GliderComponent,
    HotkeysComponent,
    AnimejsComponent,
    AlasqlComponent,
    UppyComponent,
    NgrxStoreComponent,
    // LodashComponent,
    FuseComponent,
    DayjsComponent,
    // RythmComponent,
    CssComponent
], providers: [NgrxStoreService, { provide: RouterStateSerializer, useClass: CustomSerializer }]
})


export class NewTechModule { }
