import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPetComponent } from './my-pet.component';

describe('MyPetComponent', () => {
  let component: MyPetComponent;
  let fixture: ComponentFixture<MyPetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPetComponent]
    });
    fixture = TestBed.createComponent(MyPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
