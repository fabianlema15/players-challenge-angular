import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/classes/Player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[]

  ngOnInit() {
    this.playerService.players.subscribe(players => this.players=players)
    this.playerService.loadPlayers()
    this.playerService.playersCount()
  }

  constructor(private playerService: PlayerService){}

  selectPlayer(player: Player) : void {
    this.playerService.setSelectedPlayer(player);
  }
}
