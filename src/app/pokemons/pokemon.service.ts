import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Pokemon {
  id: number;
  name: string;
}

export class PokemonDetail {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getAllPokemons(): Promise<Pokemon[]> {
    return new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get<any>('http://51.75.122.159:3000/pokemons?limit=151').subscribe((response: any) => {
        return resolve(response.data);
      });
    });
  }

  getDetails(id: number): Promise<PokemonDetail> {
    return new Promise<PokemonDetail>((resolve, reject) => {
      this.http.get<any>('http://51.75.122.159:3000/pokemons/' + id).subscribe((response: any) => {
        return resolve(response);
      });
    });
  }

  findBySearch(search: string): Promise<Pokemon[]> {
    return new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get<any>('http://51.75.122.159:3000/pokemons?search=' + search).subscribe((response: any) => {
        return resolve(response.data);
      });
    });
  }
}
