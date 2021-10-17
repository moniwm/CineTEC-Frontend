import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css'],
	providers: [DataService]
})
export class EditTheaterComponent implements OnInit {
  loading = false;
	submitted = false;
	name: string;
	form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private dataSvc: DataService
  ) { 
    this.name = this.route.snapshot.params['name'];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      cinemaAmount: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      cinemaAmount: ['', Validators.required]
    });

    this.dataSvc.getTheaterByName(this.name)
    .pipe(first())
    .subscribe(x => {
      this.f.name.setValue(x.name);
      this.f.location.setValue(x.location);
      this.f.cinemaAmount.setValue(x.cinemaAmount);
    });
  }

	get f() { return this.form.controls; }

  onKeyPress(event: any) {
		const regexpNumber = /[0-9\+\-\ ]/;
		let inputCharacter = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
			event.preventDefault();
		}
	}

  onSubmit() {
		this.submitted = true;
		this.dataSvc.putTheater(this.name, {
			"name": this.name,
      "location": this.f.location.value,
			"cinemaAmount": Number(this.f.cinemaAmount.value)
		  }).subscribe( (res) => {
			console.log("Res: ", res);
			this.router.navigate(['.', { relativeTo: this.route }]);
		  })
	}	

}
