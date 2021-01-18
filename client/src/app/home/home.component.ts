import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuthenticationService, ShareMovieService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    movies = [];

    constructor(
        private authenticationService: AuthenticationService,
        private shareMovieService: ShareMovieService
    ) {
        
    }

    ngOnInit() {
        this.loadAllMovies();
    }

    private loadAllMovies() {
        this.shareMovieService.getAll()
            .pipe(first())
            .subscribe(movies => this.movies = movies);
    }

}