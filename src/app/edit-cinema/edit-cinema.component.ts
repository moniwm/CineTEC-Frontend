import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-edit-cinema',
	templateUrl: './edit-cinema.component.html',
	styleUrls: ['./edit-cinema.component.css'],
	providers: [DataService]
})
export class EditCinemaComponent implements OnInit {
	loading = false;
	submitted = false;
	number: string;
	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private dataSvc: DataService
	) {
		this.number = this.route.snapshot.params['number'];

		this.form = this.formBuilder.group({
			theater: ['', Validators.required],
			number: ['', Validators.required],
			columns: ['', Validators.required],
			rows: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.number = this.route.snapshot.params['number'];

		this.form = this.formBuilder.group({
			theater: ['', Validators.required],
			number: ['', Validators.required],
			columns: ['', Validators.required],
			rows: ['', Validators.required],
		});

		this.dataSvc.getCinemaByNumber(this.number)
			.pipe(first())
			.subscribe(x => {
				this.f.theater.setValue(x.nameMovieTheater);
				this.f.number.setValue(x.number);
				this.f.rows.setValue(x.rows);
				this.f.columns.setValue(x.columns);
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
		this.dataSvc.putCinema(this.number, {
			"number": Number(this.number),
			"rows": Number(this.f.rows.value),
			"columns": Number(this.f.columns.value),
			"nameMovieTheater": this.f.theater.value
		  }).subscribe( (res) => {
			console.log("Res: ", res);
			this.router.navigate(['.', { relativeTo: this.route }]);
		  })
	}	


}
