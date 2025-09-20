import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  signupForm: FormGroup;
  submitting = false;
  errorMessage = '';

  photoFile: File | null = null;
  photoPieceFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numeroPiece: ['', Validators.required]
      // fichiers gérés séparément
    });
  }

  // Gestion des fichiers
  onFileChange(event: any, field: 'photo' | 'photoPiece') {
    const file: File = event.target.files[0];
    if (!file) return;

    if (field === 'photo') this.photoFile = file;
    else this.photoPieceFile = file;
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    if (!this.photoFile || !this.photoPieceFile) {
      this.errorMessage = 'Veuillez sélectionner les fichiers requis';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('nom', this.signupForm.get('nom')?.value);
    formData.append('prenom', this.signupForm.get('prenom')?.value);
    formData.append('email', this.signupForm.get('email')?.value);
    formData.append('telephone', this.signupForm.get('telephone')?.value);
    formData.append('password', this.signupForm.get('password')?.value);
    formData.append('numeroPiece', this.signupForm.get('numeroPiece')?.value);
    formData.append('photo', this.photoFile!, this.photoFile!.name);
    formData.append('photoPiece', this.photoPieceFile!, this.photoPieceFile!.name);

    this.auth.signup(formData).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.submitting = false;
      }
    });
  }
}
