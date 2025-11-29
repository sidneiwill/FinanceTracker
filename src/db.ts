import Dexie, { type Table } from 'dexie';

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

// 2. Definição do Tipo de Banco de Dados
export class DashboardDB extends Dexie {
    // Tabela 'items' tipada com a interface Item e chave primária number
    // O '!' é o Non-null assertion operator
    accounts!: Table<Account, number>; 
    cards!: Table<Card, number>;
    movements!: Table<Transaction, number>; 

    constructor() {
      super('DashboardDB');
      this.version(1).stores({
          accounts: '++id, bankName', 
          cards: '++id, accountId, cardName', 
          movements: '++id, accountId, cardId, date, type, *flags', 
      });
  }
}

export function addAcount(name: string): Promise<number> {
    return db.accounts.add({ name });
}

export async function readAcounts(): Promise<Account[]> {  
  return db.accounts.toArray().then(accts => accts.map(act => (alert(act.name), act) ));
  }

export async function clearAcounts(): Promise<void> {
  await db.accounts.clear();
}


// 3. Criação da instância
export const db = new DashboardDB();