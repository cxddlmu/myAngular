import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',

})
export class CustomPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return "This is a custom pipe" + value + (args || '');
  }

}
