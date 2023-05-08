export interface TzBlock {
  level: number;
  timestamp: string;
  hash: string;
  proposer: AliasAdressI;
  transactionCount?: number;
}

export interface AliasAdressI {
  alias: string,
  address: string
}
