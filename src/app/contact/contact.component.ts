import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService, ContactFormData } from '../services/email.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent {

  form: FormGroup = this.fb.group({
    from_name: ['', Validators.required],
    to_name: 'Alain',
    from_email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  send() {
    // Prevent duplicate submissions
    if (!this.form.valid || this.isSubmitting) {
      return;
    }

    // Reset previous states
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = null;

    const formData: ContactFormData = {
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      subject: this.form.value.subject,
      message: this.form.value.message
    };

    this.emailService.sendContactEmail(formData)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (success) => {
          if (success) {
            this.submitSuccess = true;
            // Reset form after 3 seconds
            setTimeout(() => {
              this.form.reset();
              this.form.patchValue({ to_name: 'Alain' });
              this.submitSuccess = false;
            }, 3000);
          }
        },
        error: (error) => {
          console.error('Email submission error:', error);
          this.submitError = error.text ||
            'Failed to send message. Please try again or email me directly.';
        }
      });
  }
}
