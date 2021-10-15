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
  clientId = null;
  clientPassword = null;
  isAdmin = false;
  isClient = false;
  
  constructor(private dataSvc : DataService) { 
    
  }

  ngOnInit(): void {
  }
  
  onClickLogin(){

    if (this.clientId === 'admin' && this.clientPassword == 'adminPassword'){
      this.isAdmin = true;
    } 
    else{
      this.dataSvc.getClients().subscribe( accounts => {
        for(var account of accounts){
          if(this.clientId == account.id && this.clientPassword == account.password){
            this.isClient = true;
            break;
          }
        };
      });
    }

    
  }

}
