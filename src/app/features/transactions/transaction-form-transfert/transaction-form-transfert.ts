import { Component } from '@angular/core';
import { TransactionDto, TransactionService } from '../service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transaction-form-transfert',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form-transfert.html',
  styleUrl: './transaction-form-transfert.css'
})
export class TransactionFormTransfert {
  destinataireTelephone: string = '';
  montant: number = 0;
  transaction: TransactionDto | null = null;
  message: string | null = null;

  constructor(private transactionService: TransactionService) {}

  onTransfert(form: NgForm) {
    // réinitialise l'ancienne transaction et message
    this.transaction = null;
    this.message = null;

    this.transactionService.effectuerTransfert(this.destinataireTelephone, this.montant)
      .subscribe({
        next: (res) => {
          this.transaction = res;
          this.message = `✅ Transfert de ${res.montant} vers ${this.destinataireTelephone} réussi !`;

          // réinitialiser le formulaire
          form.resetForm();
        },
        error: (err) => {
          this.message = '❌ Erreur lors du transfert';
          console.error(err);
        }
      });
  }
  
}
