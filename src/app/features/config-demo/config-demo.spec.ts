import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDemo } from './config-demo';

describe('ConfigDemo', () => {
  let component: ConfigDemo;
  let fixture: ComponentFixture<ConfigDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
