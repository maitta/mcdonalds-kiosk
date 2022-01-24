import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MachineService } from '../machine.service'

import { OrderDetailsComponent } from './order-details.component'

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent
  let fixture: ComponentFixture<OrderDetailsComponent>
  let machineServiceSpy: jasmine.SpyObj<MachineService>

  const dummyProducts = [
    {
        "photo": "assets/img/dummy1.png",
        "name": "Big Dummy",
        "price": 5.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "assets/img/dummy2.png",
        "name": "Mc Dummy",
        "price": 4.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "assets/img/dummy3.png",
        "name": "Double Dummy Burger",
        "price": 2.99,
        "active": false,
        "quantity": 1
    }
  ]

  beforeEach(async () => {
    machineServiceSpy = jasmine.createSpyObj('MachineService', ['getTotal', 'getData'], {products: dummyProducts})
    // getData needs to be mocked before the provider configuration. getData().products would be undefined otherwise
    machineServiceSpy.getData.and.returnValue({products: dummyProducts, orderTotal: 0})

    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      providers: [{ provide: MachineService, useValue: machineServiceSpy }]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should expect the component products to be the same as the service', () => {
    expect(component.products).toEqual(dummyProducts)
  })

  it('should render the order details in a table including the total', () => {
    const total = 22.95
    machineServiceSpy.getTotal.and.returnValue(total)
    fixture.detectChanges()
    const detailsElement: HTMLElement = fixture.nativeElement
    expect(detailsElement.querySelector('table')).toBeDefined()
    const headerElements = detailsElement.querySelectorAll('th')
    expect(headerElements.length).toBe(4)
    headerElements.forEach(th => expect(['Item', 'Total', total.toString()]).toContain(th.textContent!))
  })

  it('should render as many rows as there are products in the order', () => {
    dummyProducts.forEach(p => p.active = true)
    fixture.detectChanges()

    const detailsElement: HTMLElement = fixture.nativeElement
    const productRows = detailsElement.querySelector('tbody')?.querySelectorAll('tr')!
    // total summary row doesn't count
    expect(productRows.length - 1).toBe(dummyProducts.length)
  })

  it('should only render the selected products', () => {
    dummyProducts[0].active = true
    dummyProducts[1].quantity = 2
    dummyProducts[1].active = true
    // it somehow remains active without explicite assignation to false
    dummyProducts[2].active = false
    fixture.detectChanges()

    const detailsElement: HTMLElement = fixture.nativeElement
    const productsBody = detailsElement.querySelector('tbody')
    expect(productsBody?.textContent).toContain('1x ' + dummyProducts[0].name)
    expect(productsBody?.textContent).toContain('2x ' + dummyProducts[1].name)
    expect(productsBody?.textContent).not.toContain('1x ' + dummyProducts[2].name)
  })
})
