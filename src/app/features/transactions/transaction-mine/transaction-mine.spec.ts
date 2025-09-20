import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMine } from './transaction-mine';

describe('TransactionMine', () => {
  let component: TransactionMine;
  let fixture: ComponentFixture<TransactionMine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionMine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionMine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
