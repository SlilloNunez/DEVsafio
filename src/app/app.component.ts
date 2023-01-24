import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon, PokemonService } from './api.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private apiService: PokemonService) {}
  title = 'poke-api';
  elementData = [];
  breakpoint: number;
  displayedColumns: string[] = ['name', 'url'];
  displayedColumnsResume: string[] = ['letter', 'count'];
  initials: any = {};
  initialsArray: any = [];
  initialObject: any = [];
  sortedInitialObject: any = [];
  // clickedRows = new Set<PeriodicElement>();
  displayListOfPokemon: PeriodicElement;
  displayPokemon: Pokemon;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.apiService.getAllPokemons().subscribe((data) => {
      this.dataSource.data = data.results;
      var length = 1;
      data.results.map((element) => {
        var myTruncatedString = element.name.substring(0, length);
        if (this.initials[myTruncatedString]) {
          this.initials[myTruncatedString] =
            this.initials[myTruncatedString] + 1;
        } else {
          this.initials[myTruncatedString] = 1;
        }
      });
      this.initialsArray = Object.entries(this.initials);
      this.initialObject = this.initialsArray.map((x: any) => ({
        letter: x[0],
        count: x[1],
      }));
      this.sortedInitialObject = this.initialObject.sort(
        (p1: { letter: string }, p2: { letter: string }) =>
          p1.letter > p2.letter ? 1 : p1.letter < p2.letter ? -1 : 0
      );
      this.dataSourceResume.data = this.sortedInitialObject;
    });
    this.breakpoint = window.innerWidth <= 400 ? 1 : 2;
  }

  dataSource = new MatTableDataSource();
  dataSourceResume = new MatTableDataSource();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  itemSelected(row: PeriodicElement) {
    this.displayListOfPokemon = Object.assign({}, row);
    this.apiService.getPokemon(row.name).subscribe((data) => {
      this.displayPokemon = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 2;
  }
}

export interface PeriodicElement {
  name: string;
  url: string;
}
