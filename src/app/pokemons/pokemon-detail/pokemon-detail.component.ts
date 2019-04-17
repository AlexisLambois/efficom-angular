import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonDetail, PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  pokemonDetail: PokemonDetail;
  @Input() id: number;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.pokemonService.getDetails(this.id).then(res => {
      this.pokemonDetail = res;
    });
  }

  getLink(id: number): string {
    return 'assets/img/official-artwork/' + id + '.png';
  }

  parseId(id: number): string {
    let s = String(id);
    while (s.length < 3) {
      s = '0' + s;
    }
    return s;
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/audio/' + this.pokemonDetail.id + '.mp3';
    audio.load();
    audio.play();
  }
}
