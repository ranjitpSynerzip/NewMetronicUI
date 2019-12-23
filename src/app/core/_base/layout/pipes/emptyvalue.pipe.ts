import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyvalue'
})
export class EmptyvaluePipe implements PipeTransform {
	/**
	 * Transform
	 *
	 * @param value: any
	 * @param args: any
	 */
	transform(value: any, args?: any): any {
    let newStr: string = '';
    if (typeof value == 'undefined' ||   value === '' ) {
      newStr = '-';
    } else {
      newStr = value;
    }
    return newStr;
  }

}
