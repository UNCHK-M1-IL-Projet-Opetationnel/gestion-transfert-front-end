import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface SubMenuState {
  [key: string]: boolean;
}

interface Transaction {
  name: string;
  amount: string;
  time: string;
  type: 'income' | 'expense' | 'subscription' | 'transfer';
}

interface StatsCard {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']  // corrigé ici
})
export class Layout {

  isSidebarOpen: boolean = false;
  subMenuOpen: SubMenuState = {
    transactions: false,
    abonnements: false,
  };

  // Données de démonstration
  statsCards: StatsCard[] = [
    {
      title: 'Solde total',
      value: '12 450,50 €',
      trend: '+2.5%',
      trendUp: true,
      icon: '💰'
    },
    {
      title: 'Dépenses ce mois',
      value: '3 250,00 €',
      trend: '-12%',
      trendUp: false,
      icon: '📊'
    },
    {
      title: 'Revenus ce mois',
      value: '4 500,00 €',
      trend: '+8%',
      trendUp: true,
      icon: '📈'
    },
    {
      title: 'Abonnements actifs',
      value: '12',
      trend: '3 nouveaux',
      icon: '📃'
    }
  ];

  recentTransactions: Transaction[] = [
    { name: 'Grocery Store', amount: '-85,50 €', time: 'Il y a 2h', type: 'expense' },
    { name: 'Salary Deposit', amount: '+2,500,00 €', time: 'Hier', type: 'income' },
    { name: 'Netflix', amount: '-15,99 €', time: 'Il y a 3 jours', type: 'subscription' },
    { name: 'Transfer to Savings', amount: '-500,00 €', time: 'Il y a 5 jours', type: 'transfer' },
  ];

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleSubMenu(menu: string): void {
    this.subMenuOpen = {
      ...this.subMenuOpen,
      [menu]: !this.subMenuOpen[menu]
    };
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    // Fermer la sidebar sur mobile après navigation
    if (window.innerWidth < 1024) {
      this.isSidebarOpen = false;
    }
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'income': return '📈';
      case 'expense': return '📉';
      case 'subscription': return '📃';
      case 'transfer': return '🔄';
      default: return '💸';
    }
  }

  getTransactionColorClass(type: string): string {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-600';
      case 'expense': return 'bg-red-100 text-red-600';
      case 'subscription': return 'bg-blue-100 text-blue-600';
      case 'transfer': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getAmountColorClass(amount: string): string {
    return amount.startsWith('+') ? 'text-green-600' : 'text-red-600';
  }

  getTrendColorClass(trendUp?: boolean): string {
    if (trendUp === true) return 'text-green-600';
    if (trendUp === false) return 'text-red-600';
    return 'text-muted-foreground';
  }

  isSubMenuOpen(menu: string): boolean {
    return this.subMenuOpen[menu] || false;
  }

  // Fermer la sidebar quand on clique sur l'overlay
  closeSidebarOverlay(): void {
    this.isSidebarOpen = false;
  }
  logout() {
    // 🔹 Nettoyer le stockage (token, user, etc.)
    localStorage.clear();

    // 🔹 Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
