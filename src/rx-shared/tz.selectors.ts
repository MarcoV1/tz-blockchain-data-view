import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TzState} from "./tz.state";

export const selectBlocks = createFeatureSelector<TzState>("blocks");

export const selectBlockList = createSelector(
  selectBlocks,
  (state: TzState) => state.blockList
);
