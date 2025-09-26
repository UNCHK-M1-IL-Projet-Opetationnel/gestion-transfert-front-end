import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbonnementService, Abonnement } from '../../../core/services/abonnement';

@Component({
  selector: 'app-abonnement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abonnement-list.html',
  styleUrls: ['./abonnement-list.css']
})
export class AbonnementList implements OnInit {

  abonnements: Abonnement[] = [];
  abonnementsActifs: Abonnement[] = [];
  abonnementsUtilisateur: Abonnement[] = [];
  loading = false;
  errorMessage = '';

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.getAllAbonnements();
   

  }

  /** Récupérer tous les abonnements */
  getAllAbonnements(): void {
    this.loading = true;
    this.abonnementService.getAll().subscribe({
      next: (data) => {
        this.abonnements = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des abonnements';
        this.loading = false;
        console.error('Erreur abonnements', err);
      }
    });
  }


  /** Récupérer tous les abonnements de l’utilisateur connecté */

}
