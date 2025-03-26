import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AboutComponent } from './about/about.component';
import { ManageComponent } from './video/manage/manage.component';
import { UploadComponent } from './video/upload/upload.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './auth.guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'upload',
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'manage-clips',
    redirectTo: 'manage',
  },

  {
    path: 'clip/:id',
    component: ClipComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  }
];
