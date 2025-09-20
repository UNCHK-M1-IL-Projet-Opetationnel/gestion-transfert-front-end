import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementMine } from './abonnement-mine';

describe('AbonnementMine', () => {
  let component: AbonnementMine;
  let fixture: ComponentFixture<AbonnementMine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementMine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementMine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
