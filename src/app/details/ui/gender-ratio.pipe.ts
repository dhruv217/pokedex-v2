import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderRatio',
  standalone: true,
})
export class GenderRatioPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return genderRatios[value as keyof typeof genderRatios];
  }
}

const genderRatios = {
  0: '100% ♂ 0% ♀',
  1: '87.5% ♂ 12.5% ♀',
  2: '75% ♂ 25% ♀',
  3: '62.5% ♂ 37.5% ♀',
  4: '50% ♂ 50% ♀',
  5: '37.5% ♂ 62.5% ♀',
  6: '25% ♂ 75% ♀',
  7: '12.5% ♂ 87.5% ♀',
  8: '0% ♂ 100% ♀',
};
