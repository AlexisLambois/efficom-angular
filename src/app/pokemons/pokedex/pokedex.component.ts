import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  private idSelected: number;

  constructor() {
  }

  ngOnInit() {
  }

  refreshDetail(id: number): void {
    this.idSelected = undefined;
    this.idSelected = id;
  }

  get id(): number {
    return this.idSelected;
  }
}
