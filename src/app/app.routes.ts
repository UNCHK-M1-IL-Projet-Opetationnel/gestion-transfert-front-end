import { Routes } from '@angular/router';

// Layout principal
import { Layout } from './features/layout/layout';

// Transactions
import { TransactionList } from './features/transactions/transaction-list/transaction-list';
import { TransactionRecu } from './features/transactions/transaction-recu/transaction-recu';
import { TransactionMine } from './features/transactions/transaction-mine/transaction-mine';
import { TransactionFormDepot } from './features/transactions/transaction-form-depot/transaction-form-depot';
import { TransactionFormRetrait } from './features/transactions/transaction-form-retrait/transaction-form-retrait';
import { TransactionFormTransfert } from './features/transactions/transaction-form-transfert/transaction-form-transfert';

// Abonnements
import { AbonnementList } from './features/abonnements/abonnement-list/abonnement-list';
import { AbonnementDetail } from './features/abonnements/abonnement-detail/abonnement-detail';
import { AbonnementActiver } from './features/abonnements/abonnement-activer/abonnement-activer';
import { AbonnementByUser } from './features/abonnements/abonnement-by-user/abonnement-by-user';
import { AbonnementMine } from './features/abonnements/abonnement-mine/abonnement-mine';
import { AbonnementActifs } from './features/abonnements/abonnement-actifs/abonnement-actifs';

// Utilisateur
import { Profil } from './features/utilisateurs/profil/profil';

// Auth
import { authGuard } from './core/auth-guard';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

export const routes: Routes = [
  // Pages publiques
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  // Layout protégé
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      // ✅ Transactions
      { path: 'transactions', component: TransactionList },
      { path: 'transactions/:id/recu', component: TransactionRecu },
      { path: 'transactions/me', component: TransactionMine },

      { path: 'transactionsArgentaire/depot', component: TransactionFormDepot },
      { path: 'transactionsRetrait/retrait', component: TransactionFormRetrait },
      { path: 'transactionsTransfert/transfert', component: TransactionFormTransfert },

      // ✅ Abonnements
      { path: 'abonnements', component: AbonnementList },
      { path: 'abonnementsActiver/activer', component: AbonnementActiver },
      { path: 'abonnementsActifs/actifs', component: AbonnementActifs },
      { path: 'abonnements/me', component: AbonnementMine },
      { path: 'abonnements/utilisateur/:telephone', component: AbonnementByUser },
      { path: 'abonnements/:id', component: AbonnementDetail },

      // ✅ Profil utilisateur
      { path: 'profil', component: Profil },
    ]
  },

  // Redirection par défaut
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
