import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto, FirebaseService } from '../banco/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //aqui estamos criando a variavel com o nome de "produto" que recebe uma interface do tipo Produto que foi criado no firebase
  //e inicializando com valores "vazios e nulos"
       /*export interface Produto {
          id?: string;
          nome: string;
          modelo: string;
          preco: number;
          quantidade: number;
        }*/
  produto: Produto = {
    nome: '',
    modelo: '',
    quantidade: null ,
    preco: null,
  }

  produtoId = null;

  //sempre que essa classe "Tab2Page" for instanciada(criada) tudo o que estiver dentro do construtor será executado automáticamente
  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private firebaseServer: FirebaseService,
              private loadingController: LoadingController) { }
  //fim construtor

    //ngOnInit tudo o que estiver dentro deste método será executado quando a TELA desta classe for aberta pelo usu
    ngOnInit() {
      this.produtoId = this.route.snapshot.params['id'];
      if (this.produtoId)  {
        this.getTodos();
      }
    }

    //uma função asincrona é uma função que depende da resposta de algum serviço,
    //por exemplo API do firebase, ou APi dos correios, google maps, etc
    //caso o serviço demora muito para responder esse método permite que a tela do aplicativo não fique parada ou congelada
    //por sua vez o método await loading.present(); exibe um popup na
    //tela do celular dizendo que a aplicação está esperando a resposta do serviço
    //um função assincrona sempre é usado quando nós não temos controle total
    //do comportamento do método, como neste caso, dependemos das respostas da API do firebase
    //o método getTodos faz uma requisição de todos os registros existentes na API do firebase
    async getTodos() {
      const loading = await this.loadingController.create({
        message: 'Carregando sua irmã..'
      });
      await loading.present();

      this.firebaseServer.selecionaUm(this.produtoId).subscribe(res => {
        loading.dismiss();
        this.produto = res;
      });
    }


    //Vamos fazer essa em sala de aula, é bem parecida com o método acima
    //metodo assincrono que envia dados para serem gravados no servidor do firebase
    async salvaProduto() {
      const loading = await this.loadingController.create({
        message: 'Salvando sua irmã..'
      });
      await loading.present();

      if (this.produtoId) {
        this.firebaseServer.atualizarDados(this.produto, this.produtoId).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/tab3');
        });
      } else {
        this.firebaseServer.insereRegisro(this.produto).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/tab3');
        });
      }
    }

  }
