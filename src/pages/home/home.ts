import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

//home.ts é o controlador da view home.html
//esse decorator Component abaixo é que faz essa classe ser o controlador da view
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  //navCtrl é um objeto do tipo NavController. Para injetar (no Angular ou TS) uma dependência ou uma instancia de um objeto dentro da classe, você declara como parâmetro no seu Construtor
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

   //Lifecycle events ou Ciclo de vida das páginas do IONIC, são esses controlam alguns comandos nas mudanças de página 
  public ionViewWillEnter() {
      this.menu.swipeEnable(false);
    }
    
  public ionViewDidLeave() {
      this.menu.swipeEnable(true);
    }

  public login() {
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
      //empilha uma página em cima da outra.
      //com o push, ele automaticamente coloca a setinha para voltar porém, nesse caso não queremos que ele volte para a tela de login, então vamos tirar o push
      //o this é uma obrigação no TS
      //this.navCtrl.push('CategoriasPage');
    },
    error => {});   
  }

}
