import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statRatio',
  standalone: true,
})
export class StatRatioPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    return getStatDisplayRatio(value);
  }
}

function smoothExponentially(value: number, max: number) {
  // function will be y = a * (x - max)^2 + max; just need to figure out what a is, such that it intercepts 0,0
  // if you solve for a when y is 0 and x is 0, you get (-m / (m^2)) = a
  var a = -max / Math.pow(max, 2);
  return a * Math.pow(value - max, 2) + max;
}

function getStatDisplayRatio(statValue: number) {
  var maxStat = 255; // verified by grepping
  var smoothedValue = smoothExponentially(statValue, maxStat);
  return smoothedValue / maxStat;
}
