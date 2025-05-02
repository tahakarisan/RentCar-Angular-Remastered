import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriesComponent } from './favories.component';

describe('FavoriesComponent', () => {
  let component: FavoriesComponent;
  let fixture: ComponentFixture<FavoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
