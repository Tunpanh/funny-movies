import { Component, Input } from '@angular/core';
import { Movie } from '../_models/movie';

@Component({ 
    selector: 'movie',
    templateUrl: 'movie.component.html',
})

export class MovieComponent {   
    @Input() movie: Movie;

    getShortDescription(desc) {
        if (desc.length > 230)
            return desc.substring(0, 230) + "...";
        else 
            return desc;
    }
}
