import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
	selector: 'app-edit-client',
	templateUrl: './edit-client.component.html',
	styleUrls: ['./edit-client.component.css'],
	providers: [DataService]
})
export class EditClientComponent implements OnInit {
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
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			slastname: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			birthDate: ['', Validators.required],
			age: ['', Validators.required],
			password: ['', [Validators.minLength(6), Validators.required]]
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];

		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			slastname: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			birthDate: ['', Validators.required],
			age: ['', Validators.required],
			password: ['', [Validators.minLength(6), Validators.required]]
		});

		this.dataSvc.getClientById(this.id)
			.pipe(first())
			.subscribe(x => {
				this.f.name.setValue(x.firstName);
				this.f.lastname.setValue(x.lastName);
				this.f.slastname.setValue(x.secLastName);
				this.f.age.setValue(x.age);
				this.f.birthDate.setValue(x.birthDate);
				this.f.phoneNumber.setValue(x.phoneNumber);
				this.f.password.setValue(x.password);
			});
	}

	// convenience getter for easy access to form fields
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

		this.dataSvc.putClient(this.id, {
			"id": Number(this.id),
			"firstName": this.f.name.value,
			"lastName": this.f.lastname.value,
			"secLastName": this.f.slastname.value,
			"age": Number(this.f.age.value),
			"birthDate": this.f.birthDate.value,
			"phoneNumber": this.f.phoneNumber.value,
			"password": this.f.password.value,
		  }).subscribe( (res) => {
			console.log("Res: ", res);
			this.router.navigate(['.', { relativeTo: this.route }]);
		  })
	}

}
