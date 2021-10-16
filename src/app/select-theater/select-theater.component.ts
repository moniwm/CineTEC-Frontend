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

  seats = null;

  theaterSelected = false;
  movieSelected = false;
  screeningSelected = false;
  sumary = false;

  ticketsAmount = 1;
  cinemaNumber = 0;
  cinemaRows = 0;
  cinemaColumns = 0;
  screeningTime = 0;
  seatIndex = -1;
  columns = [];
  rows = [];

  theater = '';
  movie = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getTheaters().subscribe((theaters) => this.theaters = theaters);
  }

  onSelectTheater(theater : any){
    this.seatIndex = 0;
    this.theater = theater;
    this.theaterSelected = true;
    this.dataSvc.getMovieByTheater(this.theater).subscribe((res) => 
                                  {this.movies = res;
                                  this.moviesAmount = res.length});
    this.movieSelected = false;
    this.screeningSelected = false;
    this.sumary = false;
    
  }

  onSelectMovie(movie : any){
    this.seatIndex = 0;
    this.movieSelected = true;
    this.sumary = false;
    this.movie = movie;
    this.dataSvc.getScreeningByTheaterMovie(this.theater, this.movie).subscribe((res) => 
                                            {this.screenings = res;
                                            this.screeningsAmount = res.length}); 
    this.screeningSelected = false;
  }

  onSelectScreening(screeningCinemaNumber : any, screeningTime : any){
    this.cinemaNumber = screeningCinemaNumber;
    this.screeningTime = screeningTime;
    this.seatIndex = 0;
    this.screeningSelected = true;
    this.sumary = false;
    this.dataSvc.getCinemaByNumber(screeningCinemaNumber).subscribe((res) =>
                                  {this.cinemaRows = res.rows;
                                  this.cinemaColumns = res.columns;});
    this.dataSvc.getSeatByNumber(screeningCinemaNumber).subscribe((res) => this.seats = res);
    

  }

  changeTicketsAmount(amount : any){
    this.ticketsAmount = amount;
  }

  onBuyTicket(){
    this.sumary = true;
  }
}
