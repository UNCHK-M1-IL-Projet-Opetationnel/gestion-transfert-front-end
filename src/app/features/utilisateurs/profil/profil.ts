import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Auth } from '../../../core/auth';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css'],
  providers: [DecimalPipe]
})
export class Profil implements OnInit {
  profil: any = null;
  loading = false;
  errorMessage = '';

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    // Debugging complet avant l'appel API
    this.debugAuthentification();
    this.getProfil();
  }

  private debugAuthentification(): void {
    console.log('=== DEBUG AUTHENTIFICATION ===');
    
    // Vérifier le token
    const token = this.auth.getToken();
    console.log('Token présent:', !!token);
    console.log('Token complet:', token);
    
    // Vérifier si connecté
    console.log('Utilisateur connecté:', this.auth.isLoggedIn());
    
    // Décoder le token si présent
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload du token:', payload);
        console.log('User dans token:', payload.user);
        console.log('ID utilisateur:', payload.userId || payload.id);
        console.log('Token expire le:', new Date(payload.exp * 1000));
        console.log('Token expiré?', payload.exp < Date.now() / 1000);
      } catch (e) {
        console.error('Erreur décodage token:', e);
      }
    }
    
    // Vérifier l'utilisateur connecté
    const user = this.auth.getUtilisateurConnecte();
    console.log('Utilisateur connecté (méthode):', user);
    
    console.log('=== FIN DEBUG ===');
  }

  getProfil(): void {
    console.log('=== DEBUT getProfil ===');
    
    // Vérifier l'état avant l'appel
    if (!this.auth.isLoggedIn()) {
      console.error('Utilisateur non connecté, abandon de l\'appel');
      this.errorMessage = 'Vous devez être connecté pour accéder au profil';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.getProfil().subscribe({
      next: (res) => {
        console.log('Réponse complète getProfil:', res);
        
        // Adapter selon la structure de réponse
        if (res.data) {
          this.profil = res.data;
        } else {
          this.profil = res;
        }
        
        console.log('Profil stocké:', this.profil);
        this.loading = false;
      },
      error: (err) => {
        console.error('=== ERREUR getProfil ===');
        console.error('Erreur complète:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        console.error('Error body:', err.error);
        
        // Messages d'erreur détaillés
        if (err.status === 403) {
          this.errorMessage = 'Accès refusé. Vérifiez vos permissions ou reconnectez-vous.';
          console.log('Erreur 403 détectée - problème d\'autorisation');
          
          // Forcer la déconnexion après un délai
          setTimeout(() => {
            console.log('Déconnexion forcée après erreur 403');
            this.auth.logout();
          }, 3000);
          
        } else if (err.status === 401) {
          this.errorMessage = 'Session expirée. Redirection vers la connexion...';
          setTimeout(() => this.auth.logout(), 2000);
          
        } else {
          this.errorMessage = err.error?.message || 'Impossible de récupérer le profil';
        }
        
        this.loading = false;
        console.error('=== FIN ERREUR ===');
      }
    });
  }

  // Méthode pour tester manuellement depuis le template
  testConnexion(): void {
    console.log('=== TEST MANUEL ===');
    this.debugAuthentification();
  }

  // Méthode pour forcer la déconnexion
  forceLogout(): void {
    console.log('Déconnexion forcée par l\'utilisateur');
    this.auth.logout();
  }
}