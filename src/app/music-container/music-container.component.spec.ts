import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicContainerComponent } from './music-container.component';

describe('MusicContainerComponent', () => {
  let component: MusicContainerComponent;
  let fixture: ComponentFixture<MusicContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
