import { Component } from '@angular/core';
import { TransactionDto, TransactionService } from '../service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transaction-form-retrait',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form-retrait.html',
  styleUrl: './transaction-form-retrait.css'
})
export class TransactionFormRetrait {
  montant: number = 0;
  transaction: TransactionDto | null = null;
  erreur: string | null = null;

  constructor(private transactionService: TransactionService) {}
  onRetrait(retraitForm: NgForm) {
    if (this.montant <= 0) {
      this.erreur = 'Veuillez saisir un montant supérieur à 0';
      this.autoClearMessage();
      return;
    }

    this.erreur = null;
    this.transaction = null;

    this.transactionService.effectuerRetrait(this.montant).subscribe({
      next: (res) => {
        this.transaction = res;
        this.montant = 0;            
        retraitForm.resetForm();     
        this.autoClearMessage();
      },
      error: (err) => {
        this.erreur = err.error?.message || err.message;
        this.autoClearMessage();
      }
    });
  }

  private autoClearMessage() {
    setTimeout(() => {
      this.transaction = null;
      this.erreur = null;
    }, 5000); // les messages disparaissent après 5 secondes
  }
}
