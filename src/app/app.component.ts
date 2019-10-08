import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';


//esse arquivo é o controlador da página app.html
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  //esse atributo diz qual é a página inicial do aplicativo quando iniciado
  //transformando em string consegue a flexibilidade do Lazy Loading sem precisar importar a classe da página

  pages: Array<{title: string, component: string}>;
  //tudo acima são atributos

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: 'HomePage' }
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: ''}

    ];

  }

  //função
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //
  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.nav.setRoot('HomePage');
        //redireciona para a página inicial
        break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}
