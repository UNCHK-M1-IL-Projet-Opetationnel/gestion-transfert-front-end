import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Auth } from '../../core/auth';

export interface TransactionDto {
  id: number;
  type: string; // "DEPOT" | "RETRAIT"
  montant: number;
  date: string;
  utilisateurId: number;
  utilisateurNom: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:4080/api/transactions';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getUtilisateurConnecte(): any | null {
    const token = this.auth.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.sub }; // selon ton JWT
    } catch (err) {
      console.error('Impossible de décoder le token', err);
      return null;
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Dépôt avec token et montant en query param
   */
  effectuerDepot(montant: number): Observable<TransactionDto> {
    const utilisateur = this.getUtilisateurConnecte();
    if (!utilisateur) return throwError(() => new Error('Utilisateur non connecté'));
  
    return this.http.post<{ status: string, data: TransactionDto }>(
      `${this.apiUrl}/depot?montant=${montant}`,
      {}, // body vide
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(res => res.data) 
    );
  }

  /**
   * Retrait avec token et montant en query param
   */
  effectuerRetrait(montant: number): Observable<TransactionDto> {
    const utilisateur = this.getUtilisateurConnecte();
    if (!utilisateur) return throwError(() => new Error('Utilisateur non connecté'));

    return this.http.post<TransactionDto>(
      `${this.apiUrl}/retrait?montant=${montant}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Récupérer toutes les transactions avec token
   */
  getTransactions(): Observable<TransactionDto[]> {
    const utilisateur = this.getUtilisateurConnecte();
    if (!utilisateur) return throwError(() => new Error('Utilisateur non connecté'));

    return this.http.get<TransactionDto[]>(
      `${this.apiUrl}/user/${utilisateur.id}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
