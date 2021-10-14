import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-screening-management',
  templateUrl: './screening-management.component.html',
  styleUrls: ['./screening-management.component.css'],
  providers: [ DataService]
})
export class ScreeningManagementComponent implements OnInit {

  screenings = null

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getScreenings().subscribe( (screenings) => {
      this.screenings = screenings;
    })
  }

}
