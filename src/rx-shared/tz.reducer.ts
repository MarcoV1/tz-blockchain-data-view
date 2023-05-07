import {Action, createReducer, on} from "@ngrx/store";
import {initialState, TzState} from "./tz.state";
import * as TzActions from "./tz.actions";

export const blocksReducer = createReducer(
  initialState,
  on(TzActions.getListOfBlocksSuccess, (state, { blockList }) => ({
    ...state,
    blockList: blockList,
  })),
);

export function reducer(state: TzState | undefined, action: Action) {
  return blocksReducer(state, action);
}
