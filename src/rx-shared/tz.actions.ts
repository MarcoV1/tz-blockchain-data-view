import {createAction, props} from "@ngrx/store";
import {TzBlock} from "../types/tz-block.interface";

export const getListOfBlocks = createAction(
  "[Block List] Get Blocks");

export const getListOfBlocksSuccess = createAction(
  "[Block List] Get Blocks Success",
  props<{ blockList: TzBlock[] }>()
);

export const getListOfBlocksFailed = createAction(
  "[Block List] Get Blocks Failed",
  props<{ error: any }>()
);
