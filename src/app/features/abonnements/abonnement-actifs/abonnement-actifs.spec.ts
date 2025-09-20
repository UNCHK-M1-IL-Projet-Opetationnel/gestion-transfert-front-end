import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementActifs } from './abonnement-actifs';

describe('AbonnementActifs', () => {
  let component: AbonnementActifs;
  let fixture: ComponentFixture<AbonnementActifs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementActifs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementActifs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
