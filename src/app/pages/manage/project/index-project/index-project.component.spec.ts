import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProjectComponent } from './index-project.component';

describe('IndexProjectComponent', () => {
  let component: IndexProjectComponent;
  let fixture: ComponentFixture<IndexProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
