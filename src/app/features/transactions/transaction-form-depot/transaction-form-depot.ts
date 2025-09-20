import { Component } from '@angular/core';
import { TransactionDto, TransactionService } from '../service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form-depot',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form-depot.html',
  styleUrls: ['./transaction-form-depot.css'] 
})
export class TransactionFormDepot {
  montant: number = 0;
  message: string = '';
  transaction?: TransactionDto;

  constructor(private transactionService: TransactionService) {}

  onDepot() {
    if (this.montant <= 0) {
      this.message = "Le montant doit être supérieur à 0.";
      return;
    }
  
    try {
      this.transactionService.effectuerDepot(this.montant).subscribe({
        next: res => {
          this.transaction = res;
          this.message = `✅ Dépôt de ${res.montant} effectué avec succès !`;
        },
        error: err => {
          console.error(err);
          this.message = "❌ Erreur lors du dépôt.";
        }
      });
    } catch (error) {
      console.error(error);
      this.message = "❌ Utilisateur non connecté !";
    }
  }
  
}
