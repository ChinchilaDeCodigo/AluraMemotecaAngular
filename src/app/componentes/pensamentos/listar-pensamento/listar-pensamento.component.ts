import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  paginaAtual: number = 1;
  listaPensamentos: Pensamento[] = [  ];
  temMaisPensamentos: boolean = true;

  filtro: string = ''
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

  carregarPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length){
        this.temMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos(){
    this.temMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  listarFavoritos(){
    this.titulo =  'Meus Favoritos'
    this.favoritos = true
    this.temMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual,this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
      this.listaFavoritos = listaPensamentos
    })
  }

  recarregarComponente(){
    this.favoritos = false
    this.paginaAtual = 1

    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }
}
