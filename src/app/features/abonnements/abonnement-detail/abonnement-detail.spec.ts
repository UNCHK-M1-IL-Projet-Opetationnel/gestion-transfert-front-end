import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementDetail } from './abonnement-detail';

describe('AbonnementDetail', () => {
  let component: AbonnementDetail;
  let fixture: ComponentFixture<AbonnementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
