import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from 'src/app/produtos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
    itensCarrinho: IProdutoCarrinho[] = [];
    total = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this,this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calcularTotal();
  }

  removerItensCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerItensCarrinho(produtoId);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  comprar() {
    alert("Compra finalizada com sucesso!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"])
  }

}
