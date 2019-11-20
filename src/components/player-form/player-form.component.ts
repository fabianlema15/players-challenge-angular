import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Player } from 'src/classes/Player';
import { PlayerService } from 'src/services/player.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  @ViewChild('closeModal', {static: true}) closeModal: ElementRef
  selectedPlayer : Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.selectedPlayer.subscribe(player => this.selectedPlayer=player)
  }

  removePlayer() : void {
    this.playerService.removePlayer(this.selectedPlayer.id)
    this.closeModal.nativeElement.click()
  }

  savePlayer(playerForm: NgForm) {
    if (!this.selectedPlayer.id){
      this.playerService.addPlayer(playerForm.value)
    }else{
      this.selectedPlayer = {...playerForm.value, id: this.selectedPlayer.id }
      this.playerService.editPlayer(this.selectedPlayer)
    }
    this.closeModal.nativeElement.click()
  }

}
