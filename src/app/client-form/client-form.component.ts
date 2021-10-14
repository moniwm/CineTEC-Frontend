import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  providers: [DataService],
})
export class ClientFormComponent implements OnInit {

  name = '';
  lastName = '';
  secLastName = '';
  id = '';
  phoneNumber = '';
  birthDate = '';
  age = '';
  password = '';

  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
  }

  onClickRegister(){

    this.dataSvc.postClient({
      "id": Number(this.id),
      "firstName": this.name,
      "lastName": this.lastName,
      "secLastName": this.secLastName,
      "age": Number(this.age),
      "birthDate": "2021-10-13T05:41:17.490Z",
      "phoneNumber": this.phoneNumber,
      "password": this.password
    }).subscribe( (res) => {
      console.log("Res: ", res);
    })
  }

}
