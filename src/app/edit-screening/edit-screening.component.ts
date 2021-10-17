import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.css'],
  providers: [DataService]
})
export class EditScreeningComponent implements OnInit {
  loading = false;
  submitted = false;
  id: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataSvc: DataService
  ) {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      cinemaNumber: ['', Validators.required],
      movieOriginalName: ['', Validators.required],
      hour: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      cinemaNumber: ['', Validators.required],
      movieOriginalName: ['', Validators.required],
      hour: ['', Validators.required],
      capacity: ['', Validators.required]
    });

    this.dataSvc.getScreeningById(this.id)
    .pipe(first())
    .subscribe(x => {
      this.f.cinemaNumber.setValue(x.cinemaNumber);
      this.f.movieOriginalName.setValue(x.movieOriginalName);
      this.f.hour.setValue(x.hour);
      this.f.capacity.setValue(x.capacity);
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
		this.dataSvc.putScreening(this.id, {
			"id": this.id,
      "cinemaNumber": Number(this.f.cinemaNumber.value),
			"movieOriginalName": this.f.movieOriginalName.value,
			"hour": Number(this.f.hour.value),
			"capacity": Number(this.f.capacity.value),
		  }).subscribe( (res) => {
			console.log("Res: ", res);
			this.router.navigate(['.', { relativeTo: this.route }]);
		  })
	}	


}
