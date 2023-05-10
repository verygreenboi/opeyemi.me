import * as uuid from 'uuid';
import { BaseComponent } from './base-component';

interface ISectionComponent extends BaseComponent {
  refresh(): void;
}
export abstract class SectionComponent implements ISectionComponent {
  id: string = uuid.v4();
  abstract refresh(): void;
}