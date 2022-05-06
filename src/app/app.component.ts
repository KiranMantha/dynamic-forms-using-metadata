import { Component, VERSION } from '@angular/core';
import metadata from '../assets/metadata.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  controls;

  constructor() {
    this.controls = metadata.controls;
  }
}
