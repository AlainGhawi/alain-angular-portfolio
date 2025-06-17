import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  form: FormGroup = this.fb.group({
    from_name:'',
    to_name: 'Alain',
    from_email: '',
    subject: '',
    message: '',
  });
  constructor(private fb:FormBuilder){ }

  // This function is called when the form is submitted to send the email
  // It uses the EmailJS service to send the email with the form data
  // Make sure to replace 'your-service-id', 'your-template-id', and 'your-public-key' with your actual EmailJS credentials
  async send() {
    let response = await emailjs.send('your-service-id','your-template-id',{
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      subject: this.form.value.subject,
      message: this.form.value.message,
      }, 'your-public-key');

    alert('Your message has been sent! I will try to get back to you asap.');
    this.form.reset();
  }

}
