import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget';
import { WidgetResolved } from '../../models/widget-resolved';
import { WidgetService } from '../../services/widget.service';
import { MessageService } from '../../../messages/message.service';

@Component({
  selector: 'app-widget-update',
  templateUrl: './widget-update.component.html',
  styleUrls: ['./widget-update.component.css']
})
export class WidgetUpdateComponent implements OnInit {

  widgetUpdateForm!: FormGroup;
  public widget: Widget | null = null;
  public pageTitle = 'Update Widget';
  public errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private widgetService: WidgetService) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      const resolvedData: WidgetResolved = data['resolvedData'];
      this.errorMessage = String(resolvedData.error);
      this.onDataRetrieved(resolvedData.widget);
    });

  }

  onDataRetrieved(widget: Widget | null): void {

    if (widget == null) {

      this.pageTitle = "Widget Not Found";

      // get id number passed in from router
      const id = Number(this.route.snapshot.paramMap.get('id'));

      widget = {
        id: id,
        name: '',
        shape: ''
      }
    }

    this.widget = widget;
    this.pageTitle = `${this.widget.shape} ${this.widget.name}`;

    this.widgetUpdateForm = new FormGroup({
      'id': new FormControl(this.widget.id),
      'shape': new FormControl(this.widget.shape),
      'name': new FormControl(this.widget.name)
    });

    // initialize the form
    this.widgetUpdateForm.setValue({
      id: this.widget.id,
      shape: this.widget.shape,
      name: this.widget.name
    });


  }

  onSubmit() {

    this.widget = this.widgetUpdateForm.value;

    console.log('onSubmit: ' + JSON.stringify(this.widget));

    if (this.widget == null) {
      console.log('Null widget passed into onSubmit from update form.');
      return; // how not to bury the error?
    }

    this.widgetService.updateWidget(this.widget).subscribe({
      next: () => this.onSaveComplete(`The widget ${this.widget?.name} was updated.`),
      error: err => this.errorMessage = err
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