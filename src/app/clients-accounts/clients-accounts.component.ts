import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clients-accounts',
  templateUrl: './clients-accounts.component.html',
  styleUrls: ['./clients-accounts.component.css'],
  providers: [ DataService ]
})
export class ClientsAccountsComponent implements OnInit {

  accounts = null

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getClients().subscribe( (accounts) => {
      this.accounts = accounts;
    })
  }

  deleteClient(clientID : any){
    this.dataSvc.deleteClient(clientID).subscribe((res) => console.log(res));
    //window.location.reload();
  }
}
