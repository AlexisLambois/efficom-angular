import {Component, OnInit} from '@angular/core';
import {TeamService} from './team.service';
import {Pokemon, PokemonDetail, PokemonService} from '../pokemons/pokemon.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'types', 'height', 'weight', 'star'];
  dataSource: PokemonDetail[] = [];
  myDetails: Observable<PokemonDetail>[] = [];
  messageAlert: string;
  stateCtrl = new FormControl();
  filteredStates: Observable<Pokemon[]>;
  listPokemon: Pokemon[] = [];

  constructor(private http: HttpClient, private teamService: TeamService, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.refresh();
    this.getListPokemon();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.listPokemon.slice())
      );
  }

  fork() {
    if (this.myDetails.length !== 0) {
      forkJoin(this.myDetails).subscribe((res: PokemonDetail[]) => {
        this.dataSource = res;
      });
    } else {
      this.dataSource = [];
    }
  }

  removePokemon(id: number): void {
    this.messageAlert = '';
    delete this.dataSource[id];
    this.dataSource = this.dataSource.filter(res => {
      return res !== undefined;
    });
    const ids = this.dataSource.map(function (obj) {
      return obj.id;
    });
    this.teamService.updateTeam(ids).then(res => {
      this.refresh();
    });
  }

  refresh() {
    this.myDetails = [];
    this.teamService.getMyTeam().then((res: number[]) => {
      res.forEach(item => {
        this.myDetails.push(this.pokemonService.getDetailsObs(item));
      });
      this.fork();
    });
  }

  addPokemon(id: number): void {
    this.stateCtrl.reset();
    let ids: number[];
    ids = this.dataSource.map(function (obj) {
      return obj.id;
    });
    if (ids.length === 6) {
      this.messageAlert = 'Il y a déjà assez de pokémons dans cette équipe !! Enlevez en un !';
    } else {
      ids.push(id);
      this.teamService.updateTeam(ids).then(res => {
        this.refresh();
      });
    }
  }

  private _filterStates(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();
    return this.listPokemon.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getListPokemon(): void {
    this.pokemonService.getAllPokemons().then(response => this.listPokemon = response);
  }
}
