import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="container">
      <div class="pokeball pokeball-animated"></div>
    </div>
  `,
  styles: `
    .container {
      margin-top: 0.25rem;
    }

    .pokeball {
      box-sizing: border-box;
      --pokeball-size: 2rem;
      --pokeball-inner-size: calc(var(--pokeball-size) * 8 / 25);
      --pokeball-border-size: calc(var(--pokeball-size) / 25);

      --before-diameter: var(--pokeball-inner-size);
      --after-diameter: calc(var(--before-diameter) - (var(--pokeball-border-size) * 3));

      border: var(--pokeball-border-size) solid #262122;
      width: var(--pokeball-size);
      height: var(--pokeball-size);
      border-radius: 100%;
      margin: 0 auto;
      position: relative;

      background: linear-gradient(
        150deg,
        #BA0C2F 0%,
        #BA0C2F 44%,
        #262122 44%,
        #262122 56%,
        #fff 56%,
        #fff 100%
      );
    }

    .pokeball:before,
    .pokeball:after {
      content: " ";
      border-radius: 100%;
      display: block;
      position: absolute;
    }

    .pokeball:before {
      width: var(--before-diameter);
      height: var(--before-diameter);
      top: calc(50% - var(--before-diameter) / 2);
      left: calc(50% - var(--before-diameter) / 2);
      background: #262122;
    }

    .pokeball:after {
      width: var(--after-diameter);
      height: var(--after-diameter);

      top: calc(50% - (((var(--before-diameter) - (var(--pokeball-border-size) * 3)) / 2) + var(--pokeball-border-size)));
      left: calc(50% - (((var(--before-diameter) - (var(--pokeball-border-size) * 3)) / 2) + var(--pokeball-border-size)));

      background: #fff;
      border: double var(--pokeball-border-size) #262122;
    }

    .pokeball-animated {
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
      animation-name: shake;
    }

    @keyframes shake {
      from {
        transform: none;
      }

      20% {
        transform: translate3d(-20%, 0, 0) rotate3d(0, 0, 1, -10deg);
      }

      40% {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 5deg);
      }

      50% {
        transform: translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -10deg);
      }

      60% {
        transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 5deg);
      }

      to {
        transform: none;
      }
    }
  `,
})
export class LoadingComponent {}
