import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/classes/Player';

@Component({
  selector: 'app-player-delete',
  templateUrl: './player-delete.component.html',
  styleUrls: ['./player-delete.component.css']
})
export class PlayerDeleteComponent implements OnInit {
  @ViewChild('closeModal', {static: true}) closeModal: ElementRef
  private selectedPlayer : Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.selectedPlayer.subscribe(player => this.selectedPlayer=player)
  }

  removePlayer() : void {
    this.playerService.removePlayer(this.selectedPlayer.id)
    this.closeModal.nativeElement.click()
  }

}
