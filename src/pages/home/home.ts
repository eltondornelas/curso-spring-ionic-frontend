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

  //navCtrl é um objeto do tipo NavController. Para injetar (no Angular ou TS) uma dependência ou uma instancia de um objeto dentro da classe, você declara como parâmetro no seu Construtor
  constructor(public navCtrl: NavController) {

  }

  public login() {
    //o this é uma obrigação no TS
    //this.navCtrl.push('CategoriasPage');
    this.navCtrl.setRoot('CategoriasPage');
    //empilha uma página em cima da outra.
    //com o push, ele automaticamente coloca a setinha para voltar porém, nesse caso não queremos que ele volte para a tela de login, então vamos tirar o push
  }

}
