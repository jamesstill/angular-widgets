import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Widget } from '../models/widget';
import { map, catchError } from 'rxjs/operators';

import { WidgetResolved } from '../models/widget-resolved';
import { WidgetService } from './widget.service';

/*
  ------------------------------------------------------------------------------
  LEFT OFF HERE: Is this the way to go? Is this needed?
  ------------------------------------------------------------------------------

*/

export class WidgetResolverStub implements Resolve<WidgetResolved> {
  constructor(private service: WidgetService) {}

  resolve() : Observable<WidgetResolved> {
    const widget: Widget = { id: 1, name: 'Widget', shape: 'Square' };
    return of({ widget, error: '' });
  }

}
