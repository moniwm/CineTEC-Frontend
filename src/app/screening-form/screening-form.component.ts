import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-screening-form',
  templateUrl: './screening-form.component.html',
  styleUrls: ['./screening-form.component.css'],
  providers: [ DataService]
})
export class ScreeningFormComponent implements OnInit {

  id = '';
  cinemaNumber = '';
  movieOriginalName = '';
  hour = '';
  capacity = 100;
  cinemas : any;
  selectedTheater : any;
  selectedCinema = '';


  constructor(private dataSvc : DataService) { 
    this.cinemas = [];
  }

  ngOnInit(): void {
    this.dataSvc.getCinemas().subscribe((res) => {this.cinemas = res;
      console.log(res);
      console.log(this.cinemas)});
    //this.selectedCinema = this.cinemas[0].nameMovieTheater + " cinema: #" + this.cinemas[0].number;
    
  }

  addScreening(){
    this.dataSvc.postScreening(
      {
        "id": Number(this.id),
        "cinemaNumber": Number(this.cinemaNumber),
        "movieOriginalName": this.movieOriginalName,
        "hour": Number(this.hour),
        "capacity": Number(this.capacity)
      }).subscribe((res) => console.log(res));
  }

  changeCapacity(selectedCapacity : number){

    this.capacity = selectedCapacity;
  }



}
