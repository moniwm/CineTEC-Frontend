import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cinemas-management',
  templateUrl: './cinemas-management.component.html',
  styleUrls: ['./cinemas-management.component.css'],
  providers : [ DataService ]
})
export class CinemasManagementComponent implements OnInit {

  cinemas = null

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getCinemas().subscribe( (cinemas) => {
      this.cinemas= cinemas;
    })
  }

  deleteCinema(number : any){
    this.dataSvc.deleteCinema(number).subscribe((res) => console.log(res));
    window.location.reload();
}
}