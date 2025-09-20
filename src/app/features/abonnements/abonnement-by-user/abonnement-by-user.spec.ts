import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementByUser } from './abonnement-by-user';

describe('AbonnementByUser', () => {
  let component: AbonnementByUser;
  let fixture: ComponentFixture<AbonnementByUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementByUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementByUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
