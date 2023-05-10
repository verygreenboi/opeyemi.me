import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from 'src/core/component';
import * as uuid from 'uuid';

@Component({
  selector: 'section[opy-intro-section]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SectionComponent,
      useExisting: IntroSectionComponent
    }
  ]
})
export class IntroSectionComponent extends SectionComponent {
  refresh(): void {
    console.log('refresh intro section');
  }
}
