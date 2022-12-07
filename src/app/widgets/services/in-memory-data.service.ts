import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const widgets: Widget[] = [
      { id: 12, name: 'Widget', shape: 'Square' },
      { id: 13, name: 'Gear', shape: 'Round' },
      { id: 14, name: 'Sprocket', shape: 'Octagonal' },
      { id: 15, name: 'Pinion', shape: 'Rectangular' },
      { id: 16, name: 'Cog', shape: 'Oblong' }
    ];
    return { widgets };
  }

  // Overrides the genId method to ensure that a widget always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(widgets: Widget[]): number {
    return widgets.length > 0 ? Math.max(...widgets.map(w => w.id)) + 1 : 11;
  }
}