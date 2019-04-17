import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PokemonsComponent} from './pokemons/pokemons.component';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';
import {MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
