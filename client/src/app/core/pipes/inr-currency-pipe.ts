import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrCurrency',
})
export class InrCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(
    value: number | string,
    digitsInfo: string = '1.2-2',
    display: 'symbol' | 'code' | 'symbol-narrow' = 'symbol'
  ): string | null {
    return this.currencyPipe.transform(value, 'INR', display, digitsInfo);
  }
}
