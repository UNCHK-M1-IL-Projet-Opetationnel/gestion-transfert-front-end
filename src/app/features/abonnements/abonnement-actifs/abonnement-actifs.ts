import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbonnementService, Abonnement } from '../../../core/services/abonnement';

@Component({
  selector: 'app-abonnement-actifs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abonnement-actifs.html',
  styleUrls: ['./abonnement-actifs.css']
})
export class AbonnementActifs implements OnInit {
  abonnementsActifs: Abonnement[] = [];
  loading = false;
  errorMessage = '';

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    this.getAbonnementsActifs();
  }

  /** Récupérer les abonnements actifs de l’utilisateur connecté */
  getAbonnementsActifs(): void {
    this.loading = true;
    this.abonnementService.getMineActifs().subscribe({
      next: (data) => {
        this.abonnementsActifs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur abonnements actifs', err);
        this.errorMessage = 'Impossible de charger les abonnements actifs';
        this.loading = false;
      }
    });
  }
}
