import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private appUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Board/';

  constructor(private http:HttpClient) { }

  _getBoards():Observable<Board[]>{
    return this.http.get<Board[]>(`${this.appUrl}${this.apiUrl}`);
  }

  _getBoard(idBoard:number):Observable<Board>{
    return this.http.get<Board>(`${this.appUrl}${this.apiUrl}${idBoard}`);
  }
}
