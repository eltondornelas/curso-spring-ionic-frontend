export interface PagamentoDTO {
    numeroDeParcelas : number;
    "@type" : string;
    //o compilador não aceita campo começando com @, por isso precisa colocar entre aspas
} 