import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenStorageService } from 'src/app/core/authentication/auth-token-storage.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ErrorService } from 'src/app/core/services/error/error.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import grapesjs from 'grapesjs';
import grapesjsmjml from 'grapesjs-mjml';
import plugin from 'grapesjs-preset-newsletter';
import 'grapesjs-plugin-ckeditor';
import 'quill-emoji';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  editor: any;
  innerBlock: any;
  selectedText: any;

htmlText = '';

  quillConfig = {
      //toolbar: '.toolbar',
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['code-block'],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          //[{ 'direction': 'rtl' }],                         // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          //[{ 'font': [] }],
          //[{ 'align': [] }],

          ['clean'], // remove formatting button

          ['link'],
          ['link', 'image', 'video', 'emoji'],
        ],
      },

      'emoji-toolbar': true,
      'emoji-textarea': false,
      'emoji-shortname': true,

    };



  constructor(
    private router: Router,
    public loginFormBuilder: UntypedFormBuilder,
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

     this.editor = grapesjs.init({
      container : '#gjs',
      components: `        <mjml>
                            <mj-body>
                                <!-- Your MJML body here -->
                                <mj-section>
                                    <mj-column>
                                        <mj-text>My Company</mj-text>
                                    </mj-column>
                                </mj-section>
                            </mj-body>
                        </mjml>`,
      // ...
      plugins: [plugin,grapesjsmjml, 'grapesjs-plugin-ckeditor'],
      pluginsOpts: {
        [plugin]: { /* options */ },
      }
    });

    this.editor.DomComponents.addType('text', {

      // Model definition
      model: {
        // Default properties
        defaults: {
          selectable: false,
          editable: false,
          highlightable:false,
          hoverable: false,
          draggable:false
        }
      }
    });

        this.editor.on('component:selected', (component) => {
        if(component.get('type') == 'mj-text') {
        let r = (Math.random() + 1).toString(36).substring(7);
           var a = '<h1 style="text-align:right; color:red">feifihmohmoe</h1>' + '<p>' + r + '</p>'
        console.log('frgiiofjr');
                component.components(a);

        }

        });




this.zef();






  }

  toto() : void {
    if(this.selectedText) {
    console.log(this.htmlText);
        this.selectedText.components(this.htmlText.replace(`/<span class="ql-cursor">/gi`, '').replace('/<\/span>', ''));
    }
  }

zef(): void {


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
