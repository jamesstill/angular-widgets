import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WidgetResolved } from '../models/widget-resolved';
import { WidgetService } from './widget.service';

@Injectable({ providedIn: 'root' })
export class WidgetResolver implements Resolve<WidgetResolved> {
  constructor(private service: WidgetService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<WidgetResolved> {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id)) {
      const message = `ID was not a number: ${id}`;
      console.error(message);
      return of({ widget: null, error: message });
    }

    return this.service.getWidget(id).pipe(
      map((widget) => ({ widget, error: '' })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ widget: null, error: message });
      })
    );
  }
}
