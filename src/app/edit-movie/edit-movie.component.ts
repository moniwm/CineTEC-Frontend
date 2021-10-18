import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
	providers: [DataService]
})
export class EditMovieComponent implements OnInit {
  loading = false;
	submitted = false;
	originalName: string;
	form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private dataSvc: DataService
  ) { 
    this.originalName = this.route.snapshot.params['originalName'];

    this.form = this.formBuilder.group({
      originalName: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      director: ['', Validators.required],
      length: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.originalName = this.route.snapshot.params['originalName'];

    this.form = this.formBuilder.group({
      originalName: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      director: ['', Validators.required],
      length: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.dataSvc.getMovieByName(this.originalName)
			.pipe(first())
			.subscribe(x => {
				this.f.originalName.setValue(x.originalName);
				this.f.name.setValue(x.name);
				this.f.gender.setValue(x.gendre);
				this.f.director.setValue(x.director);
				this.f.length.setValue(x.lenght);
				this.f.imageUrl.setValue(x.imageUrl);
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
		this.dataSvc.putMovie(this.originalName, {
			"originalName": this.originalName,
			"gendre": this.f.gender.value,
			"name": this.f.name.value,
			"director": this.f.director.value,
      "imageUrl": this.f.imageUrl.value,
			"lenght": Number(this.f.length.value)
		  }).subscribe( (res) => {
			console.log("Res: ", res);
			this.router.navigate(['.', { relativeTo: this.route }]);
		  })
	}	
}
