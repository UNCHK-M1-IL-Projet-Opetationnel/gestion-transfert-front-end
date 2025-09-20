import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementActiver } from './abonnement-activer';

describe('AbonnementActiver', () => {
  let component: AbonnementActiver;
  let fixture: ComponentFixture<AbonnementActiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementActiver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementActiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
