import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenStorageService } from 'src/app/core/authentication/auth-token-storage.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';

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
    public authenticationService: AuthService,
    public clientService: ClientService,
    private errorService: ErrorService,
    private stockageToken: AuthTokenStorageService
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

  // login(): void {
  //   if (this.loginForm.valid) {
  //     this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
  //       _ => this.setCurrentClient(),
  //       err => console.log(err)
  //     );
  //   }
  // }

  /**
   * Login
   */
  login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        data => {
          this.stockageToken.saveToken(data.token);
          this.stockageToken.saveLoginUtilisateur(data.login);
          this.stockageToken.saveRoles(data.roles);
          this.stockageToken.saveJWTExpirationTime();
          this.router.navigate(['tabs/dashboard']);
        },
        err => this.errorService.handleError(err)
      );
    }
  }

  // setCurrentClient(): void {
  //   this.clientService.getClientBack(this.loginForm.value.username).subscribe(
  //     (client: Client) => {
  //       localStorage.setItem('currentUser', JSON.stringify(client));
  //       this.clientService.setClient(client);
  //       this.router.navigateByUrl('tabs/dashboard');
  //     },
  //     err => console.log(err)
  //   );
  // }

}
