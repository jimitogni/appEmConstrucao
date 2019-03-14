import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nome: string="";
  fabricante = "";
  modelo="";
  quantidade: number ="";

  ola = "Ola ";
  var1 = "";
  var2 = "";

  cliqueAqui(){

    if (this.nome){
      alert(this.ola + this.nome);
      this.var1 = "Bem vindo " + this.nome ;
    }

    else if (!this.nome){
      alert("em branco");
      this.var1 = "variavel em branco";
    }

  }

}
