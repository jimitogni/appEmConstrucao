import { Component, OnInit } from '@angular/core';
import { Produto, FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  produtos: Produto[];

  constructor(private produtoService: FirebaseService) { }

  ngOnInit() {
    this.produtoService.getTodos().subscribe(res => {
      this.produtos = res;
    });
  }

  remove(item) {
    this.produtoService.remove(item.id);
  }
}
