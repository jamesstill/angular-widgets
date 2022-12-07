import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { WidgetListComponent } from './widget-list.component';
import { Observable, of } from 'rxjs';
import { Widget } from '../../models/widget';
import { ActivatedRoute } from '@angular/router';
import { WidgetService } from '../../services/widget.service';
import { WidgetServiceStub } from '../../services/widget.service.stub';

describe('WidgetListComponent', () => {
  let component: WidgetListComponent;
  let fixture: ComponentFixture<WidgetListComponent>;
  let route: ActivatedRoute;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetListComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [{ provide: WidgetService, useClass: WidgetServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WidgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the WidgetListDetail component', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully initialize a list of widgets', () => {
    fixture.whenStable().then(() => {
      expect(component.widgets.length > 0);
    });

  });

});
