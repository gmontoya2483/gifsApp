import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gif, SearchGifsResponse} from '../interfaces/gif.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = environment.api_key;
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  public get historial(): string [] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados') ! ) || [];
  }


  public buscarGifs( query: string): void {

    query = query.trim().toLowerCase();

    if (!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      // Guardar en local storage historial y ultimo resultado
      localStorage.setItem('historial', JSON.stringify( this._historial) );
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
      .subscribe(
      (resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados) );

      }
    );

  }

}
