import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculBeneficeComponent } from './calcul-benefice.component';

describe('CalculBeneficeComponent', () => {
  let component: CalculBeneficeComponent;
  let fixture: ComponentFixture<CalculBeneficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculBeneficeComponent]
    });
    fixture = TestBed.createComponent(CalculBeneficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
