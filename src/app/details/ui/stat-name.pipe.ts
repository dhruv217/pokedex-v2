import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statName',
  standalone: true
})
export class StatNamePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return names[value as keyof typeof names];
  }
}

const names = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp Atk',
  'special-defense': 'Sp Def',
  speed: 'Speed',
};
