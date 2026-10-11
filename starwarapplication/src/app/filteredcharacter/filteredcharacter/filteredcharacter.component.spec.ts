import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredcharacterComponent } from './filteredcharacter.component';

describe('FilteredcharacterComponent', () => {
  let component: FilteredcharacterComponent;
  let fixture: ComponentFixture<FilteredcharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredcharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredcharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
