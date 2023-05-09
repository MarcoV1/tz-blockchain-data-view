import {AliasAdressI} from "./tz-block.interface";

export interface TzTransaction {
  level: number;
  timestamp: string;
  hash: string;
  block: string;
  sender: AliasAdressI;
  target: AliasAdressI;
  status: string;
  amount: number;
}
