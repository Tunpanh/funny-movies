import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ShareMovieService } from '@/_services';

@Component({ 
    selector: 'share-movie-form',
    templateUrl: 'share-movie-form.component.html',
})

export class ShareMovieFormComponent implements OnInit {
    shareForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private shareMovieService: ShareMovieService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.shareForm = this.formBuilder.group({
            youtubeUrl: ['', Validators.required]
        });

        // // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.shareForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.shareForm.invalid) {
            return;
        }

        this.loading = true;

        this.shareMovieService.create(this.f.youtubeUrl.value)
                              .pipe(first())
                              .subscribe(
                                  data => {
                                      this.router.navigate([this.returnUrl]);
                                  },
                                  error => {
                                      this.alertService.error(error);
                                      this.loading = false;
                                  });;
    }
}
