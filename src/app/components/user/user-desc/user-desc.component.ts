import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-desc',
  standalone: true,
  imports: [],
  templateUrl: './user-desc.component.html',
  styleUrl: './user-desc.component.css'
})
export class UserDescComponent {

  constructor(private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.url.subscribe((params) => {
      // console.log(params[1]);
    })
  }
}
