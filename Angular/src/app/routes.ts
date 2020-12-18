import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { BudgetCreateComponent } from './components/budget-create/budget-create.component';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetEditComponent } from './components/budget-edit/budget-edit.component';
import { VisualiseComponent } from './visualise/visualise.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BarchartComponent } from './barchart/barchart.component';
import { ChartComponent } from './chart/chart.component';


export const appRoutes: Routes = [

    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
      path: 'register', component: UserComponent,
      children: [{ path: '', component: SignUpComponent }]
  },
    {
      path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
   },
    {
        path: '',  component: HomeComponent, pathMatch: 'full'
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'chart',
      component: ChartComponent,canActivate:[AuthGuard]
    },
    {
      path: 'barchart',
      component: BarchartComponent,canActivate:[AuthGuard]
    },

    {
      path: 'visualise',
      component: VisualiseComponent,canActivate:[AuthGuard]
    },
    {
      path: 'progressbar',
      component: ProgressbarComponent,canActivate:[AuthGuard]
    },

    {
      path: 'home',
      component: HomeComponent
    },
    { path: 'create-employee', component: BudgetCreateComponent, canActivate:[AuthGuard] },
    { path: 'edit-employee/:id', component: BudgetEditComponent, canActivate:[AuthGuard] },
    { path: 'employees-list', component: BudgetListComponent, canActivate:[AuthGuard] }
];
