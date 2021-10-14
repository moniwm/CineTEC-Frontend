import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movies-management',
  templateUrl: './movies-management.component.html',
  styleUrls: ['./movies-management.component.css'],
  providers : [ DataService]
})
export class MoviesManagementComponent implements OnInit {

  movies = null

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getMovies().subscribe( (movies) => {
      this.movies= movies;
    })
  }

}
