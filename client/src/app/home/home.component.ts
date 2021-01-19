import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ShareMovieService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    movies = [];

    constructor(private shareMovieService: ShareMovieService) { }

    ngOnInit() {
        this.loadAllMovies();
    }

    private loadAllMovies() {
        this.shareMovieService.getAll()
            .pipe(first())
            .subscribe(movies => this.movies = movies);
    }

}