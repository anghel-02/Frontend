import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService} from "../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    this.authService.login(username, password)
  }

}




