import { TestBed } from '@angular/core/testing'

import { MachineService } from './machine.service'

describe('MachineService', () => {
  let service: MachineService
  let randomN: number
  let stockN: number
  let data: { products: any; orderTotal?: number }

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MachineService)
    stockN = service.getData().products.length
    randomN = getRandomNumberWithinBoundaries()
    data = service.getData()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get the products in stock', () => {
    data.products.forEach((p: any) => {
      expect(p.photo).not.toBeNull()
      expect(p.name).not.toBeNull()
      expect(p.price).not.toBeNull()
      expect(p.quantity).not.toBeNull()
    })    
  })

  it('should toggle active', () =>{
    const randomProduct = data.products[randomN]
    // a previous test may have set it to true
    randomProduct.active = false
    service.toggleActive(randomProduct)
    expect(randomProduct.active).toBeTrue()
    service.toggleActive(randomProduct)
    expect(randomProduct.active).toBeFalse()
  })

  it('should get the total for active items only', () => {
    let total = 0
    total = service.getTotal()
    expect(total).toBe(0)

    data.products[randomN].active = true
    data.products[randomN].quantity++
    total += data.products[randomN].price * data.products[randomN].quantity
    randomN = getRandomNumberWithinBoundaries()
    data.products[randomN].active = true
    data.products[randomN].quantity++
    total += data.products[randomN].price * data.products[randomN].quantity
    expect(service.getTotal()).toBe(parseFloat(total.toFixed(2)))
  })

  /**
   * 
   * @returns a number n that starts at 0 and ends before the length of the stock, i.e. 0 <= n < stockElements
   */
  function getRandomNumberWithinBoundaries(){
    return Math.floor(Math.random() * (stockN - 1))
  }
})
