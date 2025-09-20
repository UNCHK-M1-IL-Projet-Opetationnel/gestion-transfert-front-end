import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormTransfert } from './transaction-form-transfert';

describe('TransactionFormTransfert', () => {
  let component: TransactionFormTransfert;
  let fixture: ComponentFixture<TransactionFormTransfert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormTransfert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionFormTransfert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
