import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cinemas-form',
  templateUrl: './cinemas-form.component.html',
  styleUrls: ['./cinemas-form.component.css'],
  providers: [DataService]
})
export class CinemasFormComponent implements OnInit {

  number = '';
  capacity = '';
  theater = '';
  columns = '';
  rows = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  addCinema(){
    this.dataSvc.postCinema(
      {
      "number": Number(this.number),
      "rows": Number(this.rows),
      "columns": Number(this.columns),
      "capacity": Number(this.capacity),
      "nameMovieTheater": this.theater
    }).subscribe((res) => console.log(res));
  }

}
