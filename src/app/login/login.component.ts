import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ DataService]
})
export class LoginComponent implements OnInit {

  title = 'cinectec-frontend';
  clientId = '';
  clientPassword = '';
  
  constructor(private dataSvc : DataService) { 
    
  }

  ngOnInit(): void {
  }

  onClickLogin(){
    if (this.clientId === 'admin'){
      console.log("Is the admin");
    } 
  }

  onClickRegister(){

  }

}
