import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Auth } from '../../core/auth';

export interface TransactionDto {
  id: number;
  type: string;
  montant: number;
  frais?: number;
  date: string;
  utilisateurId: number;
  utilisateurNom: string;
  expediteurTelephone?: string;
  destinataireTelephone?: string;
}
export interface TransactionResponse {
  status: string;
  data: {
    content: TransactionDto[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
  };
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
  
    return this.http.post<{ status: string, data: TransactionDto }>(
      `${this.apiUrl}/retrait?montant=${montant}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(res => res.data ?? res)  // ✅ fallback si res.data undefined
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

  effectuerTransfert(destinataireTelephone: string, montant: number): Observable<TransactionDto> {
    const utilisateur = this.getUtilisateurConnecte();
    if (!utilisateur) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    return this.http.post<{ status: string, data: TransactionDto }>(
      `${this.apiUrl}/transfert`,
      { destinataireTelephone, montant },
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(res => res.data) // on prend seulement les données utiles
    );
  }


 
  /** ✅ 1. Récupérer toutes les transactions */
  getAllTransactions(): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(
      `${this.apiUrl}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ✅ 2. Récupérer une transaction par ID */
  getTransactionById(id: number): Observable<TransactionDto> {
    return this.http.get<TransactionDto>(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ✅ 3. Récupérer le reçu d’une transaction */
  getTransactionRecu(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}/recu`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ✅ 4. Transactions d’un utilisateur par téléphone */
  getTransactionsByTelephone(telephone: string): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(
      `${this.apiUrl}/utilisateur/${telephone}`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ✅ 5. Transactions de l’utilisateur connecté */
  getMesTransactions(): Observable<TransactionDto[]> {
  return this.http.get<TransactionResponse>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() })
  .pipe(
    map(res => res.data.content) // 🔹 extrait uniquement le tableau
  );
}

  
  
}
