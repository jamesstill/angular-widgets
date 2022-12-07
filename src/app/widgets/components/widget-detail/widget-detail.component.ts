import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Widget } from '../../models/widget';
import { WidgetService } from '../../services/widget.service';
import { WidgetResolved } from '../../models/widget-resolved';

@Component({
  selector: 'app-widget-detail',
  templateUrl: './widget-detail.component.html',
  styleUrls: ['./widget-detail.component.css'],
})
export class WidgetDetailComponent implements OnInit {
  pageTitle = 'Widget';
  id: number = 0;
  widget: Widget | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService) { }

  ngOnInit(): void {

    console.log("here");

    const resolvedData: WidgetResolved =
      this.route.snapshot.data['resolvedData'];

    //this.errorMessage = String[resolvedData.error];
    this.errorMessage = String(resolvedData.error);

    this.onDataReceived(resolvedData.widget);
    console.log('Error: ', this.errorMessage);

    // another way to pick up the ID number from the router
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    //console.log(`Widget ID in detail view: ${id}`);
  }

  onDataReceived(widget: Widget | null): void {

    // get id from router for building routerLink
    //this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.widget = widget;
    if (this.widget) {
      this.pageTitle = `Widget ${this.widget.id}`;
    }

  }

  goBack(): void {
    this.router.navigate(['/widgets'], {
      queryParamsHandling: 'preserve',
      queryParams: { message: '' },
    });
  }
}
