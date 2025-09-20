import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  // Inscription
  signup(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  // Connexion
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  // Stocker le token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Supprimer le token (déconnexion)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupérer l'utilisateur connecté depuis le token JWT
   */
  getUtilisateurConnecte(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user ?? payload; // fallback si user n'existe pas
    } catch (error) {
      console.error('Impossible de décoder le token', error);
      return null;
    }
  }
}
