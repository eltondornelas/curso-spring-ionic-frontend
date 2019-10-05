import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//home.ts é o controlador da view home.html
//esse decorator Component abaixo é que faz essa classe ser o controlador da view
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
