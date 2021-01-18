import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ShareMovieFormComponent } from './share-movie-form';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'share-movie-form', component: ShareMovieFormComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

export const appRoutingModule = RouterModule.forRoot(routes);