import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { TransactionService, TransactionDto } from '../service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, DatePipe, JsonPipe, FormsModule],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css']
})
export class TransactionList implements OnInit {
  transactions: TransactionDto[] = [];
  transactionsFiltrees: TransactionDto[] = []; // ✅ ajoutée
  transactionDetail: TransactionDto = {} as TransactionDto;
  recu: any = {};
  erreur: string | null = null;
  recherche: string = ''; 
  telephoneUtilisateur: string = '784615847';

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMesTransactions();
  }

  loadMesTransactions(): void {
    this.erreur = null;
    this.transactionService.getMesTransactions().subscribe({
      next: (transactions) => {
        console.log('Transactions récupérées :', transactions);
        this.transactions = transactions;
        this.appliquerRecherche(); // filtre appliqué dès le chargement
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des transactions :', err);
        this.erreur = err?.message || 'Erreur inconnue';
      }
    });
  }

  appliquerRecherche(): void {
    if (!this.recherche) {
      this.transactionsFiltrees = this.transactions;
    } else {
      const texte = this.recherche.toLowerCase();
      this.transactionsFiltrees = this.transactions.filter(t =>
        t.type.toLowerCase().includes(texte) ||
        (t.expediteurTelephone?.includes(texte)) ||
        (t.destinataireTelephone?.includes(texte)) ||
        t.montant.toString().includes(texte)
      );
    }
  }

  onRechercheChange() {
    this.appliquerRecherche();
  }

  voirDetail(id: number) {
    this.erreur = null;
    this.transactionService.getTransactionById(id).subscribe({
      next: (res: any) => this.transactionDetail = res.data || res,
      error: (err) => this.erreur = err.message
    });
  }

  voirRecu(id: number) {
    this.erreur = null;
    this.transactionService.getTransactionRecu(id).subscribe({
      next: (res: any) => this.recu = res.data || res,
      error: (err) => this.erreur = err.message
    });
  }
}
