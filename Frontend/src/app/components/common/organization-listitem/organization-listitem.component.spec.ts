import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationListitemComponent } from './organization-listitem.component';

describe('OrganizationListitemComponent', () => {
  let component: OrganizationListitemComponent;
  let fixture: ComponentFixture<OrganizationListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationListitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
