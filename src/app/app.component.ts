import { Component } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Viajar', url: '/viaje', icon: 'paper-plane' },
    { title: 'Programar un viaje', url: '/programar', icon: 'hourglass' },
    { title: 'Sign in', url: '/inicio', icon: 'log-in' },
    { title: 'Log out', url: '/inicio', icon: 'log-out' },

  ];
  //public ayuda = ['ayuda'];
  constructor() {
    
  }
}


