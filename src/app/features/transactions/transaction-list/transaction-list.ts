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
  transactionsFiltrees: TransactionDto[] = []; 
  
  // ✅ Nouvelles propriétés pour les cartes récapitulatives
  montantTotal: number = 0;
  nombreTransferts: number = 0;
  nombreDepots: number = 0;
  nombreRetraits: number = 0;

  // ✅ Nouvelles propriétés pour la pagination
  transactionsPaginees: TransactionDto[] = [];
  currentPage: number = 1;
  pageSize: number = 4; // ✅ Changement : 4 éléments par page comme demandé
  totalPages: number = 0;
  pages: number[] = []; 
  transactionDetail: TransactionDto | null = null;
  showDetailPopover: boolean = false;
  
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
  goToPage(page: number): void {
    this.setPage(page);
  }
  // Méthode de chargement et de traitement initial des transactions
  loadMesTransactions(): void {
    this.erreur = null;
    this.transactionService.getMesTransactions().subscribe({
      next: (transactions) => {
        // ✅ Étape de débogage : vérifions les données reçues
        console.log('Données de l\'API reçues :', transactions);
        
        this.transactions = transactions;
        this.appliquerRecherche();
        this.calculerTotaux();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erreur = err?.message || 'Erreur inconnue';
      }
    });
  }

  // ✅ Méthode pour calculer les totaux pour les cartes
  private calculerTotaux(): void {
    this.montantTotal = this.transactions.reduce((acc, t) => acc + t.montant, 0);
    this.nombreTransferts = this.transactions.filter(t => t.type.toLowerCase() === 'transfert').length;
    this.nombreDepots = this.transactions.filter(t => t.type.toLowerCase() === 'depot').length;
    this.nombreRetraits = this.transactions.filter(t => t.type.toLowerCase() === 'retrait').length;
  }

  // Méthode de filtrage (inchangée, mais appelée après le chargement)
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
    this.initialiserPagination(); // ✅ On initialise la pagination après chaque filtre
  }

  onRechercheChange() {
    this.appliquerRecherche();
  }

  // ✅ Nouvelles méthodes pour la gestion de la pagination
  private initialiserPagination(): void {
    this.totalPages = Math.ceil(this.transactionsFiltrees.length / this.pageSize);
    this.currentPage = 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // ✅ Génère [1, 2, 3, ...]
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const debutIndex = (page - 1) * this.pageSize;
    const finIndex = debutIndex + this.pageSize;
    this.transactionsPaginees = this.transactionsFiltrees.slice(debutIndex, finIndex);
  }

  goToPreviousPage(): void {
    this.setPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  // ✅ La méthode voirDetail() affiche maintenant le popover
  voirDetail(id: number): void {
    this.erreur = null;
    this.transactionService.getTransactionById(id).subscribe({
      next: (res: any) => {
        this.transactionDetail = res.data;
        this.showDetailPopover = true; // ✅ On affiche le popover
      },
      error: (err) => {
        this.erreur = err.message;
        this.transactionDetail = null;
        this.showDetailPopover = false;
      }
    });
  }

  // ✅ Nouvelle méthode pour fermer le popover
  fermerDetail(): void {
    this.showDetailPopover = false;
    this.transactionDetail = null;
  }

  voirRecu(id: number): void {
    this.erreur = null;
    this.transactionService.getTransactionRecu(id).subscribe({
      next: (res: any) => this.recu = res.data || res,
      error: (err) => this.erreur = err.message
    });
  }
}
