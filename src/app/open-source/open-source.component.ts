import { Component, OnInit } from '@angular/core';
import { GitHubService, ProcessedRepo } from '../services/github.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-open-source',
  templateUrl: './open-source.component.html',
  styleUrls: ['./open-source.component.css'],
  standalone: false
})
export class OpenSourceComponent implements OnInit {
  githubRepos: ProcessedRepo[] = [];
  isLoading = true;
  hasError = false;

  constructor(private githubService: GitHubService) {}

  ngOnInit() {
    this.githubService.getUserRepositories(environment.githubUsername, environment.maxRepositories)
      .subscribe({
        next: (repos) => {
          this.githubRepos = repos;
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  getRevealDelay(index: number): string {
    return ['', 'delay-1', 'delay-2'][index % 3];
  }
}
