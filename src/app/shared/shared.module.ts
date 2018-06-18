import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipe } from './pipe/custom.pipe';
import { SharedComponent } from './shared.component';
import { RepeatPipe } from './pipe/repeat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[CustomPipe,RepeatPipe],
  declarations: [CustomPipe,SharedComponent,RepeatPipe]
})
export class SharedModule { }
