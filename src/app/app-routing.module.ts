import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonsComponent} from './pokemons/pokemons.component';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonsComponent },
  { path: 'pokedex', component: PokedexComponent},
  { path: 'pokemon/:id', component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
