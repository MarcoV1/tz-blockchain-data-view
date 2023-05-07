import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {TzDataHandlerService} from "../services/tz-datahandler.service";
import * as TzActions from "./tz.actions";
import {Injectable} from "@angular/core";

@Injectable()
export class TzEffects {

  loadBlocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TzActions.getListOfBlocks.type, TzActions.getListOfBlocks),
      switchMap(() =>
        this.tzDataHandlerService.getTzListOfBlocks().pipe(
          map((blockList) =>
            TzActions.getListOfBlocksSuccess({ blockList: blockList })
          ),
          catchError((error) =>
            of(TzActions.getListOfBlocksFailed({ error: error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tzDataHandlerService: TzDataHandlerService
  ) {}
}
