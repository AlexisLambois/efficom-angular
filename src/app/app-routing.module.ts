import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PokemonsComponent} from './pokemons/pokemons.component';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {TeamComponent} from './team/team.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth.guard';

const routes: Routes = [
  {path: 'pokemons', component: PokemonsComponent},
  {path: 'pokedex', component: PokedexComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'team', component: TeamComponent,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
