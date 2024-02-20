import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientsComponent } from './delete-clients.component';

describe('DeleteClientsComponent', () => {
  let component: DeleteClientsComponent;
  let fixture: ComponentFixture<DeleteClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteClientsComponent]
    });
    fixture = TestBed.createComponent(DeleteClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
