import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  providers: [ DataService]
})
export class AddClientComponent implements OnInit {

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

  onClickAdd(){

    this.dataSvc.postClient({
      "id": Number(this.id),
      "firstName": this.name,
      "lastName": this.lastName,
      "secLastName": this.secLastName,
      "age": Number(this.age),
      "birthDate": this.birthDate,
      "phoneNumber": this.phoneNumber,
      "password": this.password
    }).subscribe( (res) => {
      console.log("Res: ", res);
    })

  }

}
