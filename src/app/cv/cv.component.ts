import { Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  standalone: false,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  pdfUrl = 'assets/pdf/AlainGhawiResume.pdf';
}
