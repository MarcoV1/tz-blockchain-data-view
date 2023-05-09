import {TzBlock} from "../types/tz-block.interface";

export interface TzState {
  blockList: TzBlock[];
}

export const initialState: TzState = {
  blockList: [],
};
