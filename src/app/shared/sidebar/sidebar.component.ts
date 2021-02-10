import { Component, OnInit } from '@angular/core';
import {GifsService} from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  get historial(): string []{
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar(termino: string): void {
    this.gifsService.buscarGifs(termino);
  }
}
