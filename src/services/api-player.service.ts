import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Player } from 'src/classes/Player';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiPlayerService {
  private heroesUrl = 'https://league-players.herokuapp.com/api/players';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPlayers(page: number, results: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.heroesUrl + '/page/' + page + '/results/' + results)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getHeroes', []))
      );
  }

  getPlayersCount(): Observable<Object> {
    return this.http.get<Object>(this.heroesUrl + '/count')
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getHeroes', []))
      );
  }

  getHeroNo404<Data>(id: number): Observable<Player> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Player[]>(url)
      .pipe(
        map(players => players[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} player id=${id}`);
        }),
        catchError(this.handleError<Player>(`getHero id=${id}`))
      );
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.heroesUrl, player, this.httpOptions).pipe(
      tap((newHero: Player) => this.log(`added player w/ id=${newHero.id}`)),
      catchError(this.handleError<Player>('addHero'))
    );
  }

  deletePlayer(player: Player | string): Observable<Player> {
    const id = typeof player === 'string' ? player : player.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Player>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deleteHero'))
    );
  }

  updatePlayer(player: Player): Observable<any> {
    return this.http.patch(this.heroesUrl + '/' + player.id, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('EROR:', error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
