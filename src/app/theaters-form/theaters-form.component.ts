import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-theaters-form',
  templateUrl: './theaters-form.component.html',
  styleUrls: ['./theaters-form.component.css'],
  providers: [ DataService]
})
export class TheatersFormComponent implements OnInit {

  name = '';
  location= '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  addTheater(){
    this.dataSvc.postTheater(
      {
        "name": this.name,
        "location": this.location
      }).subscribe((res) => console.log(res));
  }

}
