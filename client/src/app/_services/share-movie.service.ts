import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from '@/_models';
import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class ShareMovieService {
    constructor(private http: HttpClient, 
                private authenticationService: AuthenticationService
                ) { }

    getAll() {
        return this.http.get<Movie[]>(`${config.apiUrl}/movies`);
    }

    create(movieUrl) {
        const sharedByUserName = String(this.authenticationService.currentUserValue.username);
        return this.http.post(`${config.apiUrl}/movies/create`, {sharedBy: sharedByUserName, youtubeUrl: movieUrl});
    }
}