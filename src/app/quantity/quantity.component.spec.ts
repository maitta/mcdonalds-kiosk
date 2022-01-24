import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuantityComponent } from './quantity.component'

describe('QuantityComponent', () => {
  let component: QuantityComponent
  let fixture: ComponentFixture<QuantityComponent>
  const dummyProduct = {
      "name": "Mc Quantity",
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

  it('should disable the minus(-) button when quantity is 1', () => {
    // quantity may have been modified by another thest, therefore this below is needed.
    dummyProduct.quantity = 1
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTrue()
  })

  it('should enable the minus(-) button when quantity is greater than 1', () => {
    dummyProduct.quantity = 2
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse()
  })

  it('should decrease the quantity when clicking on the minus(-) button', () => {
    const previousQuantity = 3
    dummyProduct.quantity = previousQuantity
    fixture.detectChanges()
    fixture.nativeElement.querySelector('button').click()
    expect(dummyProduct.quantity).toBe(previousQuantity - 1)
  })

  it('should show the right quantity', () => {
    dummyProduct.quantity = 333
    fixture.detectChanges()
    expect((fixture.nativeElement as HTMLElement).querySelector('span')!.textContent).toContain(333)
  })

  it('should increase the quantity when clicking on the plus(+) button', () => {
    const previousQuantity = 3
    dummyProduct.quantity = previousQuantity
    fixture.detectChanges()
    fixture.nativeElement.querySelectorAll('button')[1].click()
    expect(dummyProduct.quantity).withContext('plus(+) is expected to appear to the right of the minus(-) button').toBe(previousQuantity + 1)
  })
})
