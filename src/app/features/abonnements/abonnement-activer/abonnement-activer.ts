import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbonnementService } from '../../../core/services/abonnement';

@Component({
  selector: 'app-abonnement-activer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './abonnement-activer.html',
  styleUrls: ['./abonnement-activer.css']
})
export class AbonnementActiver {

  abonnementForm: FormGroup;
  message = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private abonnementService: AbonnementService
  ) {
    this.abonnementForm = this.fb.group({
      type: ['', Validators.required] // STANDARD | PREMIUM | VIP
    });
  }

  /** Activer l’abonnement */
  activer(): void {
    if (this.abonnementForm.invalid) {
      this.message = '⚠️ Veuillez choisir un type d’abonnement';
      return;
    }

    this.loading = true;
    this.message = '';

    const type = this.abonnementForm.value.type;

    this.abonnementService.activerAbonnement(type).subscribe({
      next: (abonnement) => {
        // ✅ res est déjà un Abonnement
        this.message = `✅ Abonnement ${abonnement.type} activé avec succès`;
        this.loading = false;
        this.abonnementForm.reset();
      },
      error: (err) => {
        this.message = err.error?.message || '❌ Erreur lors de l’activation';
        this.loading = false;
      }
    });
  }
}
