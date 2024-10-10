import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  data: any;
  isLoading: boolean = false;

  constructor(private user: AuthService, private router: Router) {}

  login_form = new FormGroup({
    u_username: new FormControl(null, Validators.required),
    u_password: new FormControl(null, Validators.required),
    u_checkbox: new FormControl(false),
  });

  submitLogin() {
    // Vérifier la validité du formulaire avant de soumettre
    if (this.login_form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields',
      });
      return;
    }

    this.isLoading = true;

    this.user.postlogin(this.login_form.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        if (response.status === 'error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message || 'An error occurred',
          });
        } else {
          this.data = response.result;
          // Sauvegarder les informations de connexion
          $.cookie('isLoggedIn', true, { expires: 1, path: '/' });
          sessionStorage.setItem('infoLogin', JSON.stringify(this.data));

          Swal.fire({
            title: 'Success!',
            text: 'Admin login successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(['/admin/dashboard']);
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error during login:', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid username or password',
        });
      },
      complete: () => {
        console.log('Login process complete');
        this.isLoading = false;
      }
    });
  }
}
