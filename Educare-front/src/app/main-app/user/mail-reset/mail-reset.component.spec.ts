import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailResetComponent } from './mail-reset.component';

describe('MailResetComponent', () => {
  let component: MailResetComponent;
  let fixture: ComponentFixture<MailResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
