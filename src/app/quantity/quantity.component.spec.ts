import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuantityComponent } from './quantity.component'

describe('QuantityComponent', () => {
  let component: QuantityComponent
  let fixture: ComponentFixture<QuantityComponent>
  const dummyProduct = {
      "photo": "assets/img/big-mac.png",
      "name": "Big Mac",
      "price": 5.99,
      "active": false,
      "quantity": 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityComponent)
    component = fixture.componentInstance
    component.product = dummyProduct
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
