import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';                                                        // Import the ValidateService
import {AuthService} from '../../services/auth.service';                                                        // Import the ValidateService
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  company: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {                                                                                                  // Retriving the information from the form
    const user = {
      name: this.name,
      company: this.company,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // Required fields
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //Required Field
    if(!this.validateService.validateCompany(user.company))
    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered', {cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register'])

      }
    });
  }
}
