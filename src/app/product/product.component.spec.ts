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

  it('should display the right image', () => {
    const productElement: HTMLElement = fixture.nativeElement
    const img = productElement.querySelector('img')!
    expect(img.src).toBe(img.baseURI + dummyProduct.photo)
  })

  it('should display product name and price', () => {
    const productElement: HTMLElement = fixture.nativeElement
    expect(productElement.textContent).toContain(dummyProduct.name)
    expect(productElement.textContent).toContain(dummyProduct.price)
  })

  it('should render the quantity component only for active products', () => {
    const productElement: HTMLElement = fixture.nativeElement
    expect(productElement.querySelector('app-quantity')).toBeNull()

    dummyProduct.active = true
    fixture.detectChanges()
    expect(productElement.querySelector('app-quantity')).toBeDefined()
  })
})
