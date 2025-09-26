import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Auth } from '../../core/auth';

export interface Abonnement {
  id: number;
  utilisateur_id?: number;
  type: 'STANDARD' | 'PREMIUM' | 'VIP';
  statut?: string;        // ex: "actif" | "inactif"
  dateDebut: string;
  dateFin?: string;
  cout?: number;
  avantages?: string;
}

export interface AbonnementResponse {
  status: string;
  data: {
    content: Abonnement[];
    page?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
    last?: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private apiUrl = 'http://localhost:4080/api/abonnements';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    if (!token) throw new Error('Utilisateur non connecté');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Activer un abonnement (type dans la query string, body vide) */
  activerAbonnement(type: 'STANDARD' | 'PREMIUM' | 'VIP'): Observable<Abonnement> {
    return this.http.post<{ status: string; data: Abonnement }>(
      `${this.apiUrl}/activer?type=${type}`,
      {}, // body vide
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data));
  }

  /** Récupérer tous les abonnements */
  getAll(): Observable<Abonnement[]> {
    return this.http.get<AbonnementResponse>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data.content));
  }

  /** Récupérer tous les abonnements actifs */
  getAllActifs(): Observable<Abonnement[]> {
    return this.http.get<AbonnementResponse>(
      `${this.apiUrl}/actifs`,
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data.content));
  }

  /** Récupérer un abonnement par ID */
  getById(id: number): Observable<Abonnement> {
    return this.http.get<{ status: string; data: Abonnement }>(
      `${this.apiUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data));
  }

  /** Récupérer les abonnements de l’utilisateur connecté */
  getMine(): Observable<Abonnement[]> {
    return this.http.get<{ status: string; data: Abonnement[] }>(
      `${this.apiUrl}/me`,
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data));
  }

  /** Récupérer les abonnements actifs de l’utilisateur connecté */
  getMineActifs(): Observable<Abonnement[]> {
    return this.http.get<AbonnementResponse>(
      `${this.apiUrl}/me/actifs`,
      { headers: this.getAuthHeaders() }
    ).pipe(map(res => res.data.content));
  }
  
}
