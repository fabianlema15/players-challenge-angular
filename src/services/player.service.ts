import { Injectable } from '@angular/core';
import { ApiPlayerService } from './api-player.service';
import { Player } from 'src/classes/Player';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  resultsPage: number = 10;
  totalPlayers: number = 0;

  private playersSource = new BehaviorSubject([]);
  players: Observable<Player[]> = this.playersSource.asObservable();

  private selectedPlayerSource = new BehaviorSubject({
    id: null,
    name: null,
    jersey_number: null,
    position: null,
    team: null
  });

  selectedPlayer: Observable<Player> = this.selectedPlayerSource.asObservable();

  private currentPageSource = new BehaviorSubject(1);
  currentPage: Observable<number> = this.currentPageSource.asObservable();

  private totalPagesSource = new BehaviorSubject(0);
  totalPages: Observable<number> = this.totalPagesSource.asObservable();

  constructor(private apiPlayerService: ApiPlayerService) { }

  playersCount() : void {
    this.apiPlayerService.getPlayersCount()
      .subscribe(result => {
        this.totalPlayers = result['count']
        this.setTotalPages()
      })
  }

  loadPlayers() : void {
    this.apiPlayerService.getPlayers(this.currentPageSource.value, this.resultsPage)
      .subscribe(players => {
        this.setPlayers(players)
        this.setTotalPages()
      })
  }

  setPlayers(players: Player[]){
    this.playersSource.next(players)
  }

  addPlayer(player: Player){
    this.apiPlayerService.addPlayer(player)
      .subscribe(newPlayer => {
        this.totalPlayers++
        if (this.playersSource.value.length < this.resultsPage){
          this.playersSource.value.push(newPlayer)
        }else{
          this.setTotalPages()
        }
      })
  }

  removePlayer(id: string){
    this.apiPlayerService.deletePlayer(id)
      .subscribe(() => {
        this.totalPlayers--
        this.loadPlayers()
      })
  }

  editPlayer(player: Player){
    this.apiPlayerService.updatePlayer(player)
      .subscribe(() => {
        const indexId = this.playersSource.value.findIndex(playerT => playerT.id === player.id)
        this.playersSource.value[indexId] = player;
      })
  }

  setFirstPage() : void {
    this.currentPageSource.next(1)
  }

  setLastPage() : void {
    this.currentPageSource.next(this.getTotalPages())
  }

  setNextPage() : void {
    this.currentPageSource.next(this.currentPageSource.value + 1)
  }

  setBackPage() : void {
    this.currentPageSource.next(this.currentPageSource.value - 1)
  }

  setResultsPage(resultsPage: number) : void {
    this.resultsPage = resultsPage
  }

  setSelectedPlayer(player: Player){
    this.selectedPlayerSource.next({...player})
  }

  setTotalPages = () => {
    this.totalPagesSource.next(this.getTotalPages())
  }

  getTotalPages = () => {
    return Math.floor(this.totalPlayers / this.resultsPage) + (this.totalPlayers % this.resultsPage === 0 ? 0: 1)
  }
}
