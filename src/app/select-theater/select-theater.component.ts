import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-select-theater',
  templateUrl: './select-theater.component.html',
  styleUrls: ['./select-theater.component.css'],
  providers: [ DataService]
})
export class SelectTheaterComponent implements OnInit {

  theaters = null;
  theatersAmount = 0;

  movies = null;
  moviesAmount = 0;

  screenings = null;
  screeningsAmount = 0;

  theaterSelected = false;
  movieSelected = false;

  theater = '';
  movie = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getTheaters().subscribe((theaters) => this.theaters = theaters);
  }

  onSelectTheater(theater : any){
    this.theater = theater;
    this.theaterSelected = true;
    this.dataSvc.getMovieByTheater(this.theater).subscribe((res) => 
                                  {this.movies = res;
                                  this.moviesAmount = res.length});
    this.movieSelected = false;
    
  }

  onSelectMovie(movie : any){
    this.movieSelected = true;
    this.movie = movie;
    this.dataSvc.getScreeningByTheaterMovie(this.theater, this.movie).subscribe((res) => this.screenings = res); 
  }
}
