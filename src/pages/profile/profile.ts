import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //email: string;
  cliente: ClienteDTO;
  picture: string;
  profileImage;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {

      this.profileImage = 'assets/imgs/avatar-blank.png';
      //colocamos essa imagem padrão no construtor para garantir que sempre tenha valor de modo que não dê erro.
      
  }

  //quando cria a página usando o CLI (terminal) ele já cria com essa função.
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
    //executa algo quando a página é carregada.     

    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        //é um Cast aqui em cima.
        this.getImageIfExists(); //busca imagem do Bucket do S3.
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }
  else {
    this.navCtrl.setRoot('HomePage');
    }   
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      //importa a URL do bucket
      //esse response (resposta) é o blob, é a imagem na forma binária.
      this.blobToDataURL(response).then(dataUrl => {
        let str: string = dataUrl as string;
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        //agora deixamos claro para o Angular que não tem perigo essa url
        //sanitizer não aceita string, por isso deixamos sem a declaração da tipagem dessa variável profileImage.
      })
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
      //caso der erro na conversão, considera a imagem padrão do avatar blank.
    });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    //função que converte um blob para um base 64
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;
    //quando chamar esse método significa que está usando a câmera.

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture() {

    this.cameraOn = true;
    //quando chamar esse método significa que está usando a câmera.

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
      //aqui dentro do erro é necessário para o caso da pessoa cancelar/voltar da galeria ou da câmera. Sem isso os botões ficam desativados.
    });
  }

  sendPicture() {
    //imagem com base 64
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
      },
      error => {
      });
  }
  

  cancel() {
    this.picture = null;
    //para descartar imagem.
  }

}
