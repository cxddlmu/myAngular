import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat',  
  //pure:false // will be invoked as much times as docheck
})
export class RepeatPipe implements PipeTransform {

  transform(value: any, times: number) {
    console.log("RepeatPipe invoking");
    return value.repeat(times);
  }

}
