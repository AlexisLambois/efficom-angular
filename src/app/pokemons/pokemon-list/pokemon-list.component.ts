import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pokemon, PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  sum = 20;
  arraytoDisplay: Pokemon[] = [];
  @Output() selected: EventEmitter<number> = new EventEmitter();
  search = '';

  constructor(private pokemonService: PokemonService) {
    this.getAllPokemons();
  }

  ngOnInit() {
  }

  getLink(id: number): string {
    return 'assets/img/sprites/' + id + '.png';
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 10;
    this.appendItems(start, this.sum);
  }

  addItems(startIndex, endIndex) {
    this.arraytoDisplay = this.arraytoDisplay.concat(this.pokemons.slice(startIndex, endIndex));
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  selectItem(pokemon: Pokemon): void {
    this.selected.emit(pokemon.id);
  }

  refresh(): void {
    this.sum = 20;
    this.arraytoDisplay = [];
    if (this.search === undefined || this.search === '') {
      this.getAllPokemons();
    } else {
      this.pokemonService.findBySearch(this.search).then(res => {
        this.pokemons = res;
        this.appendItems(0, this.sum);
      });
    }
  }

  getAllPokemons(): void {
    this.pokemonService.getAllPokemons().then((res: Pokemon[]) => {
      this.pokemons = res;
      this.appendItems(0, this.sum);
    });
  }
}
