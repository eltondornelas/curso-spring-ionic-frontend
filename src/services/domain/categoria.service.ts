import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

//import { Observable } from "rxjs/Observable"; //o VS fez a importação automática desse, mas ela é incompleta, falta algumas coisas, então para ser completa, tem que importar de Rx

//para que seja injetado em outras classes
@Injectable()
export class CategoriaService {
    //como essa classe será muito utilizada, vamos colocar ela para instanciar apenas uma vez lá na classe principal app.module.ts

    constructor(public http: HttpClient) {

    }

    //vai retornar uma lista de Categorias
    public findAll() : Observable<CategoriaDTO[]> {
        //return this.http.get("http://localhost:8080/categorias");
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
        //isso faz a chamada para o backend
        //como informamos la no APICONFIG o caminho do host, não precisamos informar o caminho todo
        //Crase permite colocar variáveis dentro
        //requisição http não retorna o objeto pronto, ela é assincrona é uma chamada ajax. então precisamos encapsular/inscrever para receber a resposta, para isso precisamos usar um Observable.
    }
}