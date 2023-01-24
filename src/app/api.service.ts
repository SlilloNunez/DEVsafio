import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getAllPokemons() {
    return this.http.get<listOfPokemon>(
      'https://pokeapi.co/api/v2/pokemon?limit=1279&offset=0'
    );
  }
  getPokemon(name: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}

export interface listOfPokemon {
  count: number;
  next: string;
  previos: string;
  results: [{ name: string; url: string }];
}

export interface Pokemon {
  abilities: [
    { ability: { name: string; url: string }; is_hidden: boolean; slot: number }
  ];
  base_experience: number;
  forms: [];
  game_indices: [];
  heigth: number;
  held_items: [];
  id: number;
  is_default: boolean;
  local_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: {};
  sprites: {};
  stats: [];
  types: [
    {
      slot: number;
      type: { name: string; url: string };
    }
  ];
  weigth: number;
}
