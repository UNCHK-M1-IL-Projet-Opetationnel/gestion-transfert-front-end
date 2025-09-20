import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRecu } from './transaction-recu';

describe('TransactionRecu', () => {
  let component: TransactionRecu;
  let fixture: ComponentFixture<TransactionRecu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionRecu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionRecu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
