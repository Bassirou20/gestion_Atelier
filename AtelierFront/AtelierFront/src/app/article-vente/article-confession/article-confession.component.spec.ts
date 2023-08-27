import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleConfessionComponent } from './article-confession.component';

describe('ArticleConfessionComponent', () => {
  let component: ArticleConfessionComponent;
  let fixture: ComponentFixture<ArticleConfessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleConfessionComponent]
    });
    fixture = TestBed.createComponent(ArticleConfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
