// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HeroComponent } from './hero/hero.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BudgetCreateComponent } from './components/budget-create/budget-create.component';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetEditComponent } from './components/budget-edit/budget-edit.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { ApiService } from './service/api.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import {ProgressBarModule} from "angular-progress-bar";
import { VisualiseComponent } from './visualise/visualise.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BarchartComponent } from './barchart/barchart.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    HeroComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    BudgetCreateComponent,
    BudgetListComponent,
    BudgetEditComponent,
    VisualiseComponent,
    ProgressbarComponent,
    BarchartComponent,
    ChartComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ProgressBarModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,ApiService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
