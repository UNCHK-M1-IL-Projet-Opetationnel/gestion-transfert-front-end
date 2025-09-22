import { Component, OnInit } from '@angular/core';
import { TransactionDto, TransactionService } from '../service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.html',
  styleUrls: ['./transaction-form.css']
})
export class TransactionForm implements OnInit {
  destinataireTelephone = '';
  montant!: number;
  message = '';
  transaction?: TransactionDto;

  constructor(private transactionService: TransactionService) {}
  transactions: TransactionDto[] = [];
  transactionDetail: TransactionDto | null = null;
  recu: any = null;
  erreur: string | null = null;
  ngOnInit(): void {
    // Charger les transactions de l'utilisateur connecté
    this.loadMesTransactions();
  }

  loadMesTransactions() {
    this.erreur = null;
    this.transactionService.getMesTransactions().subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => (this.erreur = err.message)
    });
  }

  voirDetail(id: number) {
    this.erreur = null;
    this.transactionService.getTransactionById(id).subscribe({
      next: (res) => (this.transactionDetail = res),
      error: (err) => (this.erreur = err.message)
    });
  }

  voirRecu(id: number) {
    this.erreur = null;
    this.transactionService.getTransactionRecu(id).subscribe({
      next: (res) => (this.recu = res),
      error: (err) => (this.erreur = err.message)
    });
  }
}
