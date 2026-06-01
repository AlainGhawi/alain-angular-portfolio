import { Component } from '@angular/core';

interface Project {
  num: string;
  emoji: string;
  gradient: string;
  tags: string[];
  titleKey: string;
  descKey: string;
  link?: string;
  linkLabelKey: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: false
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      num: '01',
      emoji: '🏦',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      tags: ['FinTech', 'Angular', 'AML'],
      titleKey: 'PROJECTS.P1_TITLE',
      descKey: 'PROJECTS.P1_DESC',
      link: 'https://www.stcbank.com.sa/',
      linkLabelKey: 'PROJECTS.VIEW_CLIENT'
    },
    {
      num: '02',
      emoji: '🔐',
      gradient: 'linear-gradient(135deg, #0d1b0e 0%, #112211 100%)',
      tags: ['Security', 'TypeScript'],
      titleKey: 'PROJECTS.P2_TITLE',
      descKey: 'PROJECTS.P2_DESC',
      link: 'https://www.genetec.com/',
      linkLabelKey: 'PROJECTS.VIEW_CLIENT'
    },
    {
      num: '03',
      emoji: '🛍',
      gradient: 'linear-gradient(135deg, #1e1200 0%, #2a1a00 100%)',
      tags: ['E-Commerce', 'Multi-Tenant'],
      titleKey: 'PROJECTS.P3_TITLE',
      descKey: 'PROJECTS.P3_DESC',
      link: 'https://www.gotocme.com/',
      linkLabelKey: 'PROJECTS.VIEW_CLIENT'
    },
    {
      num: '04',
      emoji: '🏥',
      gradient: 'linear-gradient(135deg, #1a0e1e 0%, #201030 100%)',
      tags: ['Healthcare', 'Node.js'],
      titleKey: 'PROJECTS.P4_TITLE',
      descKey: 'PROJECTS.P4_DESC',
      link: 'https://www.gotocme.com/',
      linkLabelKey: 'PROJECTS.VIEW_CLIENT'
    },
    {
      num: '05',
      emoji: '🖥️',
      gradient: 'linear-gradient(135deg, #0e1a14 0%, #0a1a10 100%)',
      tags: ['POS', 'Real-Time'],
      titleKey: 'PROJECTS.P5_TITLE',
      descKey: 'PROJECTS.P5_DESC',
      link: 'https://www.gotocme.com/',
      linkLabelKey: 'PROJECTS.VIEW_CLIENT'
    },
    {
      num: '06',
      emoji: '🎬',
      gradient: 'linear-gradient(135deg, #1a1500 0%, #1e1800 100%)',
      tags: ['Content', 'YouTube'],
      titleKey: 'PROJECTS.P6_TITLE',
      descKey: 'PROJECTS.P6_DESC',
      link: 'https://www.youtube.com/channel/UCLYvppaPMnewPjrrETcukyg',
      linkLabelKey: 'PROJECTS.WATCH_CHANNEL'
    }
  ];

  getRevealDelay(index: number): string {
    const delays = ['', 'delay-1', 'delay-2'];
    return delays[index % 3];
  }
}
