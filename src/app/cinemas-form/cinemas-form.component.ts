import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cinemas-form',
  templateUrl: './cinemas-form.component.html',
  styleUrls: ['./cinemas-form.component.css'],
  providers: [DataService]
})
export class CinemasFormComponent implements OnInit {

  theater = '';
  id = '';
  columns = '';
  rows = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  onClickRegister(){
  }

}
