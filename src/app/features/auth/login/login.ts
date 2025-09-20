import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth, AuthResponse } from '../../../core/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule], // ✅ pas besoin HttpClientModule ici
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      telephone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{9}$/) // ✅ 9 chiffres (ex: 771234567)
        ]
      ],
      password: ['', Validators.required]
    });
  }
  submit() {
    if (this.loginForm.invalid) return;
  
    this.submitting = true;
    this.errorMessage = '';
  
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Connexion réussie', res);
        this.submitting = false;
  
        const token = res.data?.token; // ✅ récupérer correctement le token
        if (token) {
          this.auth.setToken(token); // stocker dans localStorage
        }
  
        this.router.navigate(['/transactions']); 
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Téléphone ou mot de passe incorrect';
        this.submitting = false;
      }
    });
  }
  
  
}
