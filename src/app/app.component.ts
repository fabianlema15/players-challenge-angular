import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service'
import { Player } from 'src/classes/Player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }
  
  title = 'players-challenge';

  addClick() : void {
  }

  selectPlayer() : void {
    this.playerService.setSelectedPlayer(null);
  }
}
