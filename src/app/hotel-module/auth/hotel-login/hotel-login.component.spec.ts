import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelLoginComponent } from './hotel-login.component';

describe('HotelLoginComponent', () => {
  let component: HotelLoginComponent;
  let fixture: ComponentFixture<HotelLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
