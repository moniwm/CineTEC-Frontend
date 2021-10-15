import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css'],
  providers : [DataService]
})
export class MoviesFormComponent implements OnInit {

 originalName = '';
 gendre = '';
  name = '';
  director = '';
  lenght = '';
  actors = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  addMovie(){
    this.dataSvc.postMovie(
      {
        "originalName": this.originalName,
        "gendre": this.gendre,
        "name": this.name,
        "director": this.director,
        "imageUrl": "",
        "lenght": 90
      }).subscribe((res) => console.log(res));

    this.dataSvc.postActor(
      {
        "originalMovieName": this.originalName,
        "actorName": this.actors
      }
    ).subscribe((res) => console.log(res));
  }

}
