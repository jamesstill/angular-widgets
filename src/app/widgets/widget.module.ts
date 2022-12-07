import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetRoutingModule } from './widget-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import { WidgetDetailComponent } from './components/widget-detail/widget-detail.component';
import { WidgetUpdateComponent } from './components/widget-update/widget-update.component';
import { WidgetCreateComponent } from './components/widget-create/widget-create.component';



@NgModule({
  declarations: [
    WidgetListComponent,
    WidgetDetailComponent,
    WidgetUpdateComponent,
    WidgetCreateComponent
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    })
  ],
  exports: [
    WidgetCreateComponent,
    WidgetUpdateComponent,
    WidgetDetailComponent,
    WidgetListComponent,
  ]
})
export class WidgetModule { }
