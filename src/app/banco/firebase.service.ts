import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private produtosColecao: AngularFirestoreCollection<Produto>;

  private produtos: Observable<Produto[]>;

  constructor(db: AngularFirestore) {
    this.produtosColecao = db.collection<Produto>('produtos');

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

  selecionaUm(id) {
    return this.produtosColecao.doc<Produto>(id).valueChanges();
  }

  atualizarDados(produto: Produto, id: string) {
    return this.produtosColecao.doc(id).update(produto);
  }

  insereRegisro(produto: Produto) {
    return this.produtosColecao.add(produto);
  }

  apagaRegistro(id) {
    return this.produtosColecao.doc(id).delete();
  }


}
