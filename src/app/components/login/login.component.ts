import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    public loginFormBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public clientService: ClientService

    ) { }

  ngOnInit(): void {

    this.loginForm = this.loginFormBuilder.group({
      username: ['', [
        Validators.required,
        ValidationService.noSpaceValidator,
      ]],
      password: ['', [Validators.required]]
    });

    this.router.navigateByUrl('/dashboard');

  }

  login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        _ => this.setCurrentClient(),
        err => console.log(err)
      );
    }
  }

  setCurrentClient(): void {
    this.clientService.getClientBack(this.loginForm.value.username).subscribe(
      (client: Client) => {
        localStorage.setItem('currentUser', JSON.stringify(client));
        this.clientService.setClient(client);
        this.router.navigateByUrl('/dashboard');
      },
      err => console.log(err)
    );
  }

}
