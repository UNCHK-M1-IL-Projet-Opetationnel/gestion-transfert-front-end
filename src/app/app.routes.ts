import { Routes } from '@angular/router';

// Layout principal
import { Layout } from './features/layout/layout';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { TransactionList } from './features/transactions/transaction-list/transaction-list';
import { TransactionRecu } from './features/transactions/transaction-recu/transaction-recu';
import { TransactionMine } from './features/transactions/transaction-mine/transaction-mine';
import { TransactionFormDepot } from './features/transactions/transaction-form-depot/transaction-form-depot';
import { TransactionFormRetrait } from './features/transactions/transaction-form-retrait/transaction-form-retrait';
import { TransactionFormTransfert } from './features/transactions/transaction-form-transfert/transaction-form-transfert';
import { AbonnementList } from './features/abonnements/abonnement-list/abonnement-list';
import { AbonnementDetail } from './features/abonnements/abonnement-detail/abonnement-detail';
import { AbonnementActiver } from './features/abonnements/abonnement-activer/abonnement-activer';
import { AbonnementByUser } from './features/abonnements/abonnement-by-user/abonnement-by-user';
import { AbonnementMine } from './features/abonnements/abonnement-mine/abonnement-mine';
import { AbonnementActifs } from './features/abonnements/abonnement-actifs/abonnement-actifs';
import { Profil } from './features/utilisateurs/profil/profil';
import { authGuard } from './core/auth-guard';

// Auth

export const routes: Routes = [
  // Pages publiques
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // Layout parent (protégé)
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      // Transactions
      { path: 'transactions', component: TransactionList },
      { path: 'transactions/:id/recu', component: TransactionRecu },
      { path: 'transactions/me', component: TransactionMine },

      // Formulaires
      { path: 'transactionsArgentaire/depot', component: TransactionFormDepot },
      { path: 'transactionsRetrait/retrait', component: TransactionFormRetrait },
      { path: 'transactionsTransfert/transfert', component: TransactionFormTransfert },

      // Abonnements
      { path: 'abonnements', component: AbonnementList },
      { path: 'abonnements/:id', component: AbonnementDetail },
      { path: 'abonnements/activer', component: AbonnementActiver },
      { path: 'abonnements/utilisateur/:telephone', component: AbonnementByUser },
      { path: 'abonnements/me', component: AbonnementMine },
      { path: 'abonnements/actifs', component: AbonnementActifs },

      // Profil utilisateur
      { path: 'profil', component: Profil },

      // Redirection par défaut vers la page principale après login
      { path: '', redirectTo: 'transactions', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
