import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../services/widget.service';
import { MessageService } from '../../../messages/message.service';
import { Widget } from '../../models/widget';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css'],
})
export class WidgetListComponent implements OnInit {
  widgets: Widget[] = [];
  public errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private widgetService: WidgetService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getWidgets();
  }

  getWidgets(): void {
    this.widgetService.getWidgets().subscribe((w) => (this.widgets = w));
  }

  deleteWidget(widget: Widget): void {
    var widgetName = `${widget.shape} ${widget.name}`;

    if (confirm(`Really delete the widget: ${widgetName}?`)) {
      this.widgetService.deleteWidget(widget).subscribe({
        next: () => this.onSaveComplete(`${widgetName} was deleted`),
        error: (err) => (this.errorMessage = err),
      });

      // remove from array for screen update
      this.spliceDeletedWidget(widget);
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the list
    this.router.navigate(['/widgets']);
  }

  spliceDeletedWidget(widget: Widget) {
    const idx = this.widgets.findIndex((w) => {
      return w.id === widget.id;
    });

    if (idx !== -1) {
      this.widgets.splice(idx, 1);
    }
  }
}
