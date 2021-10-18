import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  authError = false;
  
  constructor(
    private dataSvc : DataService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
    
  }

  ngOnInit(): void {
  }
  
  onClickLogin(){

    if (this.clientId === 'admin' && this.clientPassword == 'adminPassword'){
      this.router.navigate(['./clients', { relativeTo: this.route }]);
    } 
    else{
      this.dataSvc.getClients().subscribe( accounts => {
        for(var account of accounts){
          console.log(account.id);
          console.log(account.password);
          if(this.clientId == account.id && this.clientPassword == account.password){
            this.isClient = true;
            this.router.navigate(['./buyTicket/'+this.clientId, { relativeTo: this.route }]);
          }else this.authError = true;
        };
      });
    }

    
  }

}
