import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductComponent } from './product.component'

describe('ProductComponent', () => {
  let component: ProductComponent
  let fixture: ComponentFixture<ProductComponent>
  const dummyProduct = {
    "photo": "assets/img/big-mac.png",
    "name": "Big Mac",
    "price": 5.99,
    "active": false,
    "quantity": 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent)
    component = fixture.componentInstance
    component.product = dummyProduct
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
