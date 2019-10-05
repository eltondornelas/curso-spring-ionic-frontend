import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)]
})
export class HomeModule {
}
//Esse imports é padrão, toda página tem isso.
//O nome que estiver na declaração tem que ser igual ao nome da Classe. Se entrar em home.ts verá que o nome da Classe é HomePage