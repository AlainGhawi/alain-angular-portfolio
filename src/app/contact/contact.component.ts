import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {}

  private async showToast(messageKey: string, color: 'success' | 'danger') {
    const message = this.translate.instant(messageKey);
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'bottom',
      color,
      cssClass: 'contact-toast',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    await toast.present();
  }

  send() {
    // Prevent duplicate submissions
    if (!this.form.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

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
            this.showToast('CONTACT.SUCCESS', 'success');
            this.form.reset();
            this.form.patchValue({ to_name: 'Alain' });
          }
        },
        error: (error) => {
          console.error('Email submission error:', error);
          this.showToast('CONTACT.ERROR', 'danger');
        }
      });
  }
}
