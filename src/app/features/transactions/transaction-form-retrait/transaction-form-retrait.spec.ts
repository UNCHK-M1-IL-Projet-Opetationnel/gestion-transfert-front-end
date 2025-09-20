import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormRetrait } from './transaction-form-retrait';

describe('TransactionFormRetrait', () => {
  let component: TransactionFormRetrait;
  let fixture: ComponentFixture<TransactionFormRetrait>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormRetrait]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionFormRetrait);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
