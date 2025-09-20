import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormDepot } from './transaction-form-depot';

describe('TransactionFormDepot', () => {
  let component: TransactionFormDepot;
  let fixture: ComponentFixture<TransactionFormDepot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormDepot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionFormDepot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
