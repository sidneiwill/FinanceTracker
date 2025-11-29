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
    contas: Dexie.Table<Account, number>; // Define the 'contas' table
    cartoes: Dexie.Table<Card, number>; // Define the 'cartoes' table
    transacoes: Dexie.Table<Transaction, number>; // Define the 'transacoes' table

    constructor() {
        super('DashboardDB');
        this.version(1).stores({
            contas: '++id, name',
            cartoes: '++id, accountId, name, type',
            transacoes: '++id, accountId, cardId, value, date, description, category, type'
        });
        this.contas = this.table('contas');
        this.cartoes = this.table('cartoes');
        this.transacoes = this.table('transacoes');
    }
}

const db = new MyDexie();

export function addAcount(name: string): Promise<number> {
    return db.contas.add({ name });
}

export async function readAcounts(): Promise<Account[]> {  
  return db.contas.toArray().then(accts => accts.map(act => (alert(act.name), act) ));
  }

export async function clearAcounts(): Promise<void> {
  await db.contas.clear();
}


// 3. Criação da instância
export default db;