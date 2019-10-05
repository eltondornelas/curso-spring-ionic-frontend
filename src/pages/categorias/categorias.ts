import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {    
    this.categoriaService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
    //função "Callback"
    //findAll é uma função/chamada assíncrona, então ele está se "inscrevendo" para quando a resposta chegar, executar a função do subscribe, que vai pegar a resposta e escreve na tela
    //essa função é executada se sucesso
  }

}
