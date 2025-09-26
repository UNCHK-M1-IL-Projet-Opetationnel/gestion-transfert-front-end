import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface SignupRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  password: string;
  numeroPiece: string;
  photo: string;       // base64
  photoPiece: string;  // base64
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'http://localhost:4080/auth';
  
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Inscription
  signup(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  // Connexion
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  // Stocker le token
  setToken(token: string): void {
    localStorage.setItem('token', token);
    console.log('Token stocké:', !!token); 
  }

  // Récupérer le token
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token récupéré:', !!token); 
    return token;
  }

  // Créer les headers avec authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token d\'authentification manquant');
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Supprimer le token (déconnexion)
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Vérifier si le token n'est pas expiré
    return !this.isTokenExpired(token);
  }

  // Vérifier si le token est expiré
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp ? payload.exp < now : false;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true; 
    }
  }

  /**
   * Récupérer l'utilisateur connecté depuis le token JWT
   */
  getUtilisateurConnecte(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user ?? payload; 
    } catch (error) {
      console.error('Impossible de décoder le token', error);
      this.logout(); 
      return null;
    }
  }

  // Récupérer le profil utilisateur
  getProfil(): Observable<any> {
    if (!this.isLoggedIn()) {
      console.error('Utilisateur non connecté ou token expiré');
      this.logout();
      return throwError(() => new Error('Utilisateur non connecté'));
    }
  
    const headers = this.getAuthHeaders();
    
    // URL corrigée sans /api
    return this.http.get<any>(`http://localhost:4080/utilisateurs/me/profil`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur getProfil:', error);
          
          if (error.status === 401 || error.status === 403) {
            console.log('Token invalide ou expiré, déconnexion...');
            this.logout();
          }
          
          return this.handleError(error);
        })
      );
  }

  // Gestion centralisée des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé - Veuillez vous connecter';
          break;
        case 403:
          errorMessage = 'Accès interdit - Permissions insuffisantes';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur serveur interne';
          break;
        default:
          errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
      }
    }

    console.error('Erreur HTTP:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  // Méthode pour rafraîchir le token si nécessaire
  refreshToken(): Observable<AuthResponse> {
    const currentToken = this.getToken();
    if (!currentToken) {
      return throwError(() => new Error('Aucun token à rafraîchir'));
    }

    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // Méthode pour vérifier la validité du token côté serveur
  verifyToken(): Observable<any> {
    if (!this.isLoggedIn()) {
      return throwError(() => new Error('Aucun token à vérifier'));
    }

    return this.http.get(`${this.baseUrl}/verify`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          this.logout();
        }
        return this.handleError(error);
      })
    );
  }
}