import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-theaters-management',
  templateUrl: './theaters-management.component.html',
  styleUrls: ['./theaters-management.component.css'],
  providers: [ DataService ]
})
export class TheatersManagementComponent implements OnInit {

  theaters = null

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getTheaters().subscribe( (theaters) => {
      this.theaters = theaters;
    })
  }

  deleteTheater(theaterName : any){
    this.dataSvc.deleteTheater(theaterName).subscribe((res) => console.log(res));
    window.location.reload();
  }

}
