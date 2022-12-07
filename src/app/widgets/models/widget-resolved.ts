import { Widget } from './widget';

export interface WidgetResolved {
    widget: Widget | null;
    error?: string;
}