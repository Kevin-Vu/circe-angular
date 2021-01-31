import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import { Client } from 'src/app/shared/interfaces/client';

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
    public clientService: ClientService,
    private translate: TranslateService
    ) { }

  ngOnInit(): void {

    this.loginForm = this.loginFormBuilder.group({
      username: ['', [
        Validators.required,
        ValidationService.noSpaceValidator,
      ]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.router.navigateByUrl('tabs/dashboard');
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
        this.router.navigateByUrl('tabs/dashboard');
      },
      err => console.log(err)
    );
  }

}
