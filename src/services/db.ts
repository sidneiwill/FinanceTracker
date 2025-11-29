import Dexie from 'dexie';

export interface Account {
  id?: number;
  name: string;
}

export interface Card {
  id?: number;
  accountId: number;
  name: string;
  type: "credito" | "debito";
}

export interface Transaction {
  id?: number;
  accountId: number;
  cardId: number;
  value: number;
  date: Date;
  description: string;
  category: string;
  type: "entrada" | "saída";
}

class MyDexie extends Dexie {
  accounts: Dexie.Table<Account, number>; // Define the 'accounts' table
  cards: Dexie.Table<Card, number>; // Define the 'cards' table
  transactions: Dexie.Table<Transaction, number>; // Define the 'transactions' table

  constructor() {
    super('DashboardDB');
    this.version(1).stores({
      accounts: '++id, name',
      cards: '++id, accountId, name, type',
      transactions: '++id, accountId, cardId, value, date, description, category, type'
    });
    this.accounts = this.table('accounts');
    this.cards = this.table('cards');
    this.transactions = this.table('transactions');
  }
}

const db = new MyDexie();

export function addAcount(name: string): Promise<number> {
  return db.accounts.add({ name });
}

export async function readAcounts(): Promise<Account[]> {
  return db.accounts.toArray().then(accts => accts.map(act => (alert(act.name), act)));
}

export async function clearAcounts(): Promise<void> {
  await db.accounts.clear();
}


// 3. Criação da instância
export default db;