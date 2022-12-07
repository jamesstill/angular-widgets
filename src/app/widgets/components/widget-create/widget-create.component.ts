import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget';
import { WidgetService } from '../../services/widget.service';
import { MessageService } from '../../../messages/message.service';

@Component({
  selector: 'app-widget-create',
  templateUrl: './widget-create.component.html',
  styleUrls: ['./widget-create.component.css'],
})
export class WidgetCreateComponent implements OnInit {
  widgetCreateForm!: FormGroup;
  public widget!: Widget;
  public pageTitle = 'Create Widget';
  public errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.widget = this.widgetService.initializeWidget();

    this.widgetCreateForm = new FormGroup({
      id: new FormControl(this.widget.id),
      shape: new FormControl(''),
      name: new FormControl(''),
    });
  }

  onSubmit() {
    this.widget = this.widgetCreateForm.value;

    console.log('onSubmit: ' + JSON.stringify(this.widget));

    this.widgetService.addWidget(this.widget).subscribe({
      next: () =>
        this.onSaveComplete(`The widget ${this.widget?.name} was saved.`),
      error: (err) => (this.errorMessage = err),
    });
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the list
    this.router.navigate(['/widgets']);
  }

  goBack(): void {
    this.router.navigate(['/widgets'], {
      queryParamsHandling: 'preserve',
      queryParams: { message: '' },
    });
  }
}
