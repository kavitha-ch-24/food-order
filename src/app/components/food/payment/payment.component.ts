import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  accordionItems = [
    { title: 'What is Flowbite?', content: 'Flowbite is an open-source library ...' },
    { title: 'Is there a Figma file available?', content: 'Flowbite is first conceptualized ...' },
    { title: 'What are the differences between Flowbite and Tailwind UI?', content: 'The main difference is ...' }
  ];
  
  openAccordion: number | null = null;

  toggleAccordion(index: number): void {
    this.openAccordion = this.openAccordion === index ? null : index;
  }
}
