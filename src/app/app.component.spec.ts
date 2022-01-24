import { componentFactoryName } from '@angular/compiler'
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing'
import { Title } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { MachineService } from './machine.service'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let machineServiceSpy: jasmine.SpyObj<MachineService>
  const dummyProducts = [
      {
        "photo": "assets/img/fries.png",
        "name": "Fries",
        "price": 2.99,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "assets/img/nuggets.png",
        "name": "Mc Nuggets",
        "price": 3.49,
        "active": false,
        "quantity": 1
    },
    {
        "photo": "assets/img/salad.png",
        "name": "Salad",
        "price": 2.79,
        "active": false,
        "quantity": 1
    }
  ]

  beforeEach(async () => {
    machineServiceSpy = jasmine.createSpyObj('ValueService', ['getTotal', 'getData', 'toggleActive'])
    machineServiceSpy.getData.and.returnValue({products: dummyProducts, orderTotal: 0})

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: MachineService, useValue: machineServiceSpy }
      ]
    }).compileComponents()
    machineServiceSpy = TestBed.inject(MachineService) as jasmine.SpyObj<MachineService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it(`should have as title 'McDonaldKiosk'`, () => {
    expect(component.title).toEqual('McDonald\'s Kiosk')
  })

  it('should render main dashboard', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('#app')).toBeDefined()
  })

  it('should show the total as expected', () => {
    machineServiceSpy.getTotal.and.returnValue(5.99)
    expect(component.isShowTotal()).toBeTrue()
    machineServiceSpy.getTotal.and.returnValue(0.1)
    expect(component.isShowTotal()).toBeTrue()
    machineServiceSpy.getTotal.and.returnValue(0)
    expect(component.isShowTotal()).toBeFalse()
  })

  it('should render the summary section only if total is more than 0', () => {
    const appElement: HTMLElement = fixture.nativeElement
    machineServiceSpy.getTotal.and.returnValue(0)
    fixture.detectChanges()
    expect(appElement.textContent).not.toContain("Order Details")
    expect(appElement.querySelector("app-order-details")).toBeNull()
    machineServiceSpy.getTotal.and.returnValue(3.55)
    fixture.detectChanges()
    expect(appElement.textContent).toContain("Order Details")
    expect(appElement.querySelector("app-order-details")).toBeDefined()
  })

  it('should render the items and the summary in 2 different sections', () => {
    const appElement: HTMLElement = fixture.nativeElement
    machineServiceSpy.getTotal.and.returnValue(1.19)
    fixture.detectChanges()
    const sections = appElement.querySelectorAll('section')
    expect(sections.length).toBe(2)
    expect(['items', 'summary']).toContain(sections[0].className)
    expect(['items', 'summary']).toContain(sections[1].className)
  })

  it('should display as many products as there are in stock', () => {
    const appElement: HTMLElement = fixture.nativeElement
    const productElements = appElement.querySelectorAll("app-product")
  })

  it('should toggle active when clicked', () => {
    machineServiceSpy.toggleActive.and.callThrough()
    fixture.detectChanges()
    const appElement: HTMLElement = fixture.nativeElement
    const productElement: HTMLElement = appElement.querySelector("app-product")!
    productElement.click()
    expect(machineServiceSpy.toggleActive).toHaveBeenCalledTimes(1)
    expect(machineServiceSpy.toggleActive).toHaveBeenCalledWith(dummyProducts[0])
  })

  it('should assign the selected class when product is active', () => {
    dummyProducts[0].active = true
    fixture.detectChanges()
    const appElement: HTMLElement = fixture.nativeElement
    const productElement = appElement.querySelector("app-product")!
    expect(productElement.classList).toContain('selected')
  })

})
