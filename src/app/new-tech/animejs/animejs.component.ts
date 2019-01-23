import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import anime from 'lib/anime.js';

@Component({
  selector: 'app-animejs',
  templateUrl: './animejs.component.html',
  styleUrls: ['./animejs.component.css'],
})
export class AnimejsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    const keyframesVisualizerEl = document.querySelector('.keyframes-visualizer');
    const fragment = document.createDocumentFragment();
    const numberOfElements = 256;
    for (let i = 0; i < numberOfElements; i++) {
      fragment.appendChild(document.createElement('div'));
    }
    keyframesVisualizerEl.appendChild(fragment);
    const animation = anime({
      targets: '.keyframes-visualizer div',
      keyframes: [
        {
          color: '#FF4B4B',
          translateX: anime.stagger('-.15rem', { grid: [16, 16], from: 'center', axis: 'x' }),
          translateY: anime.stagger('-.15rem', { grid: [16, 16], from: 'center', axis: 'y' }),
          duration: 300
        },
        {
          translateX: anime.stagger('.125rem', { grid: [16, 16], from: 'center', axis: 'x' }),
          translateY: anime.stagger('.125rem', { grid: [16, 16], from: 'center', axis: 'y' }),
          duration: 500
        }, {
          color: '#373535',
          translateX: 0,
          translateY: 0,
          duration: 600,
        }
      ],
      delay: anime.stagger(2),
      easing: 'easeInOutQuad',
      loop: true
    });
    console.log(animation);

  }

}