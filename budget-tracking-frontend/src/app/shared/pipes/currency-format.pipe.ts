import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatPipe',
  standalone: false,
})
export class CurrencyFormatPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
