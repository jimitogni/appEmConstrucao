import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//interface do nosso objeto produto, esses serão os atributos gravados no banco de dados do Firebase da google
export interface Produto {
  id?: string;
  nome: string;
  modelo: string;
  preco: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  //aqui criamos uma variabel produtosColecao que recebe uma coleção de OBJETOS do bando de dados do fire base
  private produtosColecao: AngularFirestoreCollection<Produto>;

  //aqui criamos uma variabvel produtos que recebe um metodo que "observa" todas as mudanças que forem feitas no objeto Produto
  private produtos: Observable<Produto[]>;

  //tudo o que estiver dentro do construtor será executado automaticamente quando a classe for instanciada(criada)
  constructor(db: AngularFirestore) {
    
    //aqui estamos dizendo que a variavel produtosColecao recebe um objeto do AngularFirestore
    this.produtosColecao = db.collection<Produto>('produtos');

    //aqui nós pegamos todos os dados recebidos pela variavel acima "produtosColecao" e extraimos todos os registros que foram retornado pelo banco de dados 
    this.produtos = this.produtosColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(e => {
          const dados = e.payload.doc.data();
          const id = e.payload.doc.id;
          return { id, ...dados };
        });
      })

    );
  }

  // pega todos os registros do banco
  selecionaTodos() {
    return this.produtos;
  }

  //seleciona apenas UM registro ESPECIFICO pelo ID passado como parametro
  selecionaUm(id) {
    return this.produtosColecao.doc<Produto>(id).valueChanges();
  }

  //atualizamos um registro no banco de dados
  atualizarDados(produto: Produto, id: string) {
    return this.produtosColecao.doc(id).update(produto);
  }

  //inserindo um novo registo no bando
  insereRegisro(produto: Produto) {
    return this.produtosColecao.add(produto);
  }

  //apaga
  apagaRegistro(id) {
    return this.produtosColecao.doc(id).delete();
  }


}
