import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeSemaineComponent } from './menu-de-semaine.component';

describe('MenuDeSemaineComponent', () => {
  let component: MenuDeSemaineComponent;
  let fixture: ComponentFixture<MenuDeSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeSemaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
