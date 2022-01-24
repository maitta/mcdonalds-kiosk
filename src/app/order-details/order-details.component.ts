import { Component, Input, OnInit } from '@angular/core'
import { MachineService } from '../machine.service'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  products: any
  test: any = [1, 2, 3, 4,5]

  constructor(private machine: MachineService) {
    this.products = machine.getData().products
  }

  ngOnInit(): void {
  }

  getTotal(): number{
    return this.machine.getTotal()
  }

}
