import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletIconsComponent } from './wallet-icons.component';

describe('WalletIconsComponent', () => {
  let component: WalletIconsComponent;
  let fixture: ComponentFixture<WalletIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
