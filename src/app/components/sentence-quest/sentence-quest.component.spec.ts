import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceQuestComponent } from './sentence-quest.component';

describe('SentenceQuestComponent', () => {
  let component: SentenceQuestComponent;
  let fixture: ComponentFixture<SentenceQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentenceQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
