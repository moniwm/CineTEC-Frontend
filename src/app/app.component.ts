import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
})
export class AppComponent {
  title = 'cinectec-frontend';
  constructor(private dataSvc: DataService){}

  ngOnInit(){
    this.dataSvc.getActors().subscribe( (res) => {
      console.log("Res: ", res);
    })
  }
}
