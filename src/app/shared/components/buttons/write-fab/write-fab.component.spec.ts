import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFabComponent } from './write-fab.component';

describe('WriteFabComponent', () => {
  let component: WriteFabComponent;
  let fixture: ComponentFixture<WriteFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
