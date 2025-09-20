import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionByUser } from './transaction-by-user';

describe('TransactionByUser', () => {
  let component: TransactionByUser;
  let fixture: ComponentFixture<TransactionByUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionByUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionByUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
