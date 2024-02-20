import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeClientComponent } from './change-client.component';

describe('ChangeClientComponent', () => {
  let component: ChangeClientComponent;
  let fixture: ComponentFixture<ChangeClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeClientComponent]
    });
    fixture = TestBed.createComponent(ChangeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
