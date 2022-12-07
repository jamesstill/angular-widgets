import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WidgetDetailComponent } from './widget-detail.component';
import { Widget } from '../../models/widget';
import { WidgetResolved } from '../../models/widget-resolved';
import { WidgetService } from '../../services/widget.service';
import { WidgetServiceStub } from '../../services/widget.service.stub';
import { of } from 'rxjs';

/*
  ------------------------------------------------------------------------------
  LEFT OFF HERE: Best way to unit test the resolver and the ActivatedRoute?
  ------------------------------------------------------------------------------
*/

describe('WidgetDetailComponent', () => {
  let component: WidgetDetailComponent;
  let fixture: ComponentFixture<WidgetDetailComponent>;
  let route: ActivatedRoute;
  let widget: Widget = { id: 1, name: 'Widget', shape: 'Square' };
  let resolvedData: WidgetResolved = { widget, error: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetDetailComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        { provide: WidgetService, useClass: WidgetServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { resolvedData }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WidgetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // inject ActivatedRoute
  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute)
  });

  it('should create WidgetDetail component', () => {
    expect(component).toBeTruthy();
  });

  //
  // TODO: Need to mock sending an ID through the router
  // Created widget-resolver.service.stub.ts???
  // 
  // const resolvedData: WidgetResolved = this.route.snapshot.data['resolvedData'];
  //
  // this.id = Number(this.route.snapshot.paramMap.get('id'));

  it('should successfully fetch the widget', () => {
    expect(component.widget !== null);
    //fixture.whenStable().then(() => {
    //  expect(component.widget !== null);
    //});
  });

  it('should fetch the widget from the ActivatedRoute', () => {
    fixture.whenStable().then(() => {
      expect(component.widget?.id === 1);
    });
  });

});
