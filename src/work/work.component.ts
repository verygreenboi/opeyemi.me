import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnDestroy,
  Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header';
import { BgService } from '../core/services';

interface Work {
  title: string;
  description?: string;
  tenure: string;
  company: string;
  duties: string[];
}

type WorkList = Work[];

const workList: WorkList = [
  {
    title: 'UI/UX Lead Engineer',
    company: 'Kobo360, Nigeria',
    tenure: 'December 2021 – Till Now',
    description: 'In terms of integrated logistics solutions and truck brokerage services, Kobo360 leads innovation in Africa and assists drivers, cargo owners, and cargo recipients in managing end-to-end haulage operations. Kobo leverages big data and agile technology to lower friction and boost efficiency in the African logistics ecosystem with a strong all-in-one platform that rapidly connects cargo owners to trucks and drivers. Air France, KLM, MDS Logistics, Honeywell, Unilever, Fetswallet, Dangote, Flour Mills of Nigeria PLC, Chisco, and Ark Insurance Group are some of the clients.',
    duties: [
      'Successfully oversaw significant projects to establish best practices and quality control',
      'Responsible for the internal application\'s design standards and patterns, storyboarding, and UX vision and strategy',
      'Created wireframes meeting the business requirement with different design solutions-utilizing rapid prototyping and user feedback to adapt and iterate on interface design concepts',
      'Created interactive designs for complex web applications by way of page/user flow diagrams, and interactive wireframes in Figma',
      'Introduced the Agile methodology process and reorganized the company\'s design team by assembling a highly motivated team of more than 50 employees',
    ]
  },
  {
    title: 'Senior UI/UX Designer',
    company: 'Kobo360, Nigeria',
    tenure: 'May 2019 – November 2021',
    duties: [
      'Successfully oversaw significant projects to establish best practices and quality control',
      'Responsible for the internal application\'s design standards and patterns, storyboarding, and UX vision and strategy',
      'Created wireframes meeting the business requirement with different design solutions-utilizing rapid prototyping and user feedback to adapt and iterate on interface design concepts',
      'Created interactive designs for complex web applications by way of page/user flow diagrams, and interactive wireframes in Figma',
      'Introduced the Agile methodology process and reorganized the company\'s design team by assembling a highly motivated team of more than 50 employees',
    ]
  },
  {
    title: 'UI/UX Designer',
    company: 'Kobo360, Nigeria',
    tenure: 'November 2018 – April 2019',
    duties: [
      'Successfully oversaw significant projects to establish best practices and quality control',
      'Responsible for the internal application\'s design standards and patterns, storyboarding, and UX vision and strategy',
      'Created wireframes meeting the business requirement with different design solutions-utilizing rapid prototyping and user feedback to adapt and iterate on interface design concepts',
      'Created interactive designs for complex web applications by way of page/user flow diagrams, and interactive wireframes in Figma',
      'Introduced the Agile methodology process and reorganized the company\'s design team by assembling a highly motivated team of more than 50 employees',
    ]
  },
  {
    title: 'Senior UI/UX Designer',
    company: 'ggCircuit, Malta',
    tenure: 'November 2021',
    description: 'ggCircuit is a digital entertainment and media company that specializes in building solutions to support e-sports competitions and gaming events. The company partners with gaming event companies around the world and offers a wide range of services for viewers, brands, and gamers. With a strong commitment to building a healthy community of passionate gamers, ggCircuit empowers them to advance their abilities and gaming experience through their innovative solutions.',
    duties: [
      'Successfully oversaw significant projects to establish best practices and quality control',
      'Responsible for the internal application\'s design standards and patterns, storyboarding, and UX vision and strategy',
      'Created wireframes meeting the business requirement with different design solutions-utilizing rapid prototyping and user feedback to adapt and iterate on interface design concepts',
      'Created interactive designs for complex web applications by way of page/user flow diagrams, and interactive wireframes in Figma',
      'Introduced the Agile methodology process and reorganized the company\'s design team by assembling a highly motivated team of more than 50 employees',
    ]
  },
  {
    title: 'UI/UX Designer',
    company: 'Banklink Africa Private Equities Limited, Nigeria',
    tenure: 'July 2016 – September 2018',
    duties: [
      'Successfully oversaw significant projects to establish best practices and quality control',
      'Responsible for the internal application\'s design standards and patterns, storyboarding, and UX vision and strategy',
      'Created wireframes meeting the business requirement with different design solutions-utilizing rapid prototyping and user feedback to adapt and iterate on interface design concepts',
      'Created interactive designs for complex web applications by way of page/user flow diagrams, and interactive wireframes in Figma',
      'Introduced the Agile methodology process and reorganized the company\'s design team by assembling a highly motivated team of more than 50 employees',
    ]
  },
];

const WORK_LIST_TOKEN = new InjectionToken<WorkList>('WORK_LIST_TOKEN');

const workListProvider: Provider = {
  provide: WORK_LIST_TOKEN,
  useValue: workList
}

@Component({
  selector: 'opy-work',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [workListProvider]
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  constructor(
    private bgService: BgService,
    @Inject(WORK_LIST_TOKEN) public workList: WorkList = [],
  ) {
  }

  ngAfterViewInit(): void {
    this.bgService.init('opy-work');
    this.bgService.hideCircles();
  }

  ngOnDestroy(): void {
    this.bgService.showCircles();
  }
}
