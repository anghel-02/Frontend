import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndAuctionComponent } from './end-auction.component';

describe('EndAuctionComponent', () => {
  let component: EndAuctionComponent;
  let fixture: ComponentFixture<EndAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndAuctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
