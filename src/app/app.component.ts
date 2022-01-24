import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { MachineService } from './machine.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McDonald\'s Kiosk'
  products: any

  constructor(private titleService: Title, private machineService: MachineService){
    this.titleService.setTitle(this.title)
    // TODO refactoring this.products out of the constructor would allow for better testing
    this.products = machineService.getData().products
  }

  toggleActive(product: any){
    this.machineService.toggleActive(product)
  }

  isShowTotal(): boolean{
    return this.machineService.getTotal() > 0
  }
}
