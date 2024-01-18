import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService} from "../../auth.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit{
  hide = true;

  constructor(private authService: AuthService) {}

  @ViewChildren(MatInput) matInputs!: QueryList<MatInput>;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.matInputs && this.matInputs.first) {
        this.matInputs.first.focus();
      }
    });
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.setUsername(username);

    this.authService.login(username, password)
  }

}




