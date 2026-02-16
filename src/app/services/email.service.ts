import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  /**
   * Sends a contact form email using EmailJS
   * @param formData - Contact form data
   * @returns Observable<boolean> - true if email sent successfully, false otherwise
   */
  sendContactEmail(formData: ContactFormData): Observable<boolean> {
    const templateParams = {
      from_name: formData.from_name,
      to_name: formData.to_name,
      from_email: formData.from_email,
      subject: formData.subject,
      message: formData.message
    };

    // Convert EmailJS promise to Observable
    return from(
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
        environment.emailjs.publicKey
      )
    ).pipe(
      map((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully!', response.status, response.text);
        return true;
      }),
      catchError((error) => {
        console.error('Failed to send email:', error);
        throw error;
      })
    );
  }
}
