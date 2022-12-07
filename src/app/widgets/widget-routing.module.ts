import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import { WidgetDetailComponent } from './components/widget-detail/widget-detail.component';
import { WidgetUpdateComponent } from './components/widget-update/widget-update.component';
import { WidgetCreateComponent } from './components/widget-create/widget-create.component';
import { WidgetResolver } from './services/widget-resolver.service';

const routes: Routes = [
  { path: '', component: WidgetListComponent },
  { path: 'widgets', component: WidgetListComponent },
  { path: 'widget-create', component: WidgetCreateComponent },
  { 
    path: 'widget-detail/:id', 
    component: WidgetDetailComponent,
    resolve: { resolvedData: WidgetResolver }
  },
  { 
    path: 'widget-update/:id', 
    component: WidgetUpdateComponent,
    resolve: { resolvedData: WidgetResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetRoutingModule {}