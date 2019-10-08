import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id : string;
    nome : string;
    estado? : EstadoDTO;
    //campo opcional para ele não interferir de mostrar as cidades sem estar os estados anexado as cidades
}