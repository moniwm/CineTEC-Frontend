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

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  addScreening(){
    this.dataSvc.postScreening(
      {
        "id": Number(this.id),
        "cinemaNumber": Number(this.cinemaNumber),
        "movieOriginalName": this.movieOriginalName,
        "hour": Number(this.hour)
      }).subscribe((res) => console.log(res));
  }

}
