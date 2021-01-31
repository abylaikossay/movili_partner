import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LocationResolver} from './services/resolvers/location/location.resolver';

const routes: Routes = [
  {
    path: 'main',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/outer/main/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/outer/main/registration/registration.module').then( m => m.RegistrationPageModule)
      },
      {
        path: 'sms',
        loadChildren: () => import('./pages/outer/main/sms/sms.module').then( m => m.SmsPageModule)
      },
      {
        path: 'password-confirm',
        loadChildren: () => import('./pages/outer/main/password-confirm/password-confirm.module').then( m => m.PasswordConfirmPageModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./pages/outer/main/welcome/welcome.module').then( m => m.WelcomePageModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./pages/outer/main/location/location.module').then( m => m.LocationPageModule),
        resolve: {
          cityList: LocationResolver
        }
      },
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'draft',
    loadChildren: () => import('./pages/draft/draft.module').then(m => m.DraftPageModule),
  },
  {
    path: '',
    redirectTo: '/main/login',
    pathMatch: 'full'
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
