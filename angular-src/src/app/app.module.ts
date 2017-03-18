import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes} from  '@angular/router';


// Custom services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { JuiceComponent } from './components/juice/juice.component';
import { GlassComponent } from './components/glass/glass.component';

const appRoutes: Routes = [
  { path:'', component: HomeComponent },                                                                                // Setting up the path for the homepage
  { path:'register', component: RegisterComponent },                                                                    // Setting up Register route
  { path:'login', component: LoginComponent },                                                                          // Setting up Login route
  { path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},                                          // Setting up Dashboard route
  { path:'juice', component: JuiceComponent },                                                                          // Setting up Dashboard route
  { path:'glass', component: GlassComponent }                                                                           // Setting up Dashboard route
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    JuiceComponent,
    GlassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
