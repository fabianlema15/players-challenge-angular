import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  currentPage: number;
  totalPages: number

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.currentPage.subscribe(currentPage => this.currentPage=currentPage)
    this.playerService.totalPages.subscribe(totalPages => this.totalPages=totalPages)
  }

  setFirst(event) : void {
    event.preventDefault()
    this.playerService.setFirstPage()
    this.playerService.loadPlayers()
  }

  setNextPage(event) : void{
    event.preventDefault()
    this.playerService.setNextPage()
    this.playerService.loadPlayers()
  }

  setBackPage(event) : void{
    event.preventDefault()
    this.playerService.setBackPage()
    this.playerService.loadPlayers()
  }

  setLast(event) : void {
    event.preventDefault()
    this.playerService.setLastPage()
    this.playerService.loadPlayers()
  }

}
