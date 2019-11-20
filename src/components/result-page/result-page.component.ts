import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  changeResultsPage(selectedValue: number) : void {
    this.playerService.setResultsPage(selectedValue)
    this.playerService.setFirstPage() 
    this.playerService.loadPlayers()
  }

}
