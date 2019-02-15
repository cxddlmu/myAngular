import { Component, OnInit } from '@angular/core';
import hotkeys from 'hotkeys-js';

@Component({
  selector: 'app-hotkeys',
  templateUrl: './hotkeys.component.html',
  // styleUrls: ['./honptkeys.component.css']
})
export class HotkeysComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    hotkeys('*', {
      scope: 'wcj',
    }, function (e) {
      // if (hotkeys.shift) console.log('shift is pressed!');
      // if (hotkeys.ctrl) console.log('ctrl is pressed!');
      // if (hotkeys.alt) console.log('alt is pressed!');
      // if (hotkeys.option) console.log('option is pressed!');
      // if (hotkeys.control) console.log('control is pressed!');
      // if (hotkeys.cmd) console.log('cmd is pressed!');
      // if (hotkeys.command) console.log('command is pressed!');
      console.log(e.keyCode);
      console.log(hotkeys.getScope());
      console.log(hotkeys.getPressedKeyCodes());
    });
    hotkeys.setScope('wcj');
  }

}