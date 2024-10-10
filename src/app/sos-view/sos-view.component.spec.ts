import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SosViewComponent } from './sos-view.component';

describe('SosViewComponent', () => {
  let component: SosViewComponent;
  let fixture: ComponentFixture<SosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SosViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
