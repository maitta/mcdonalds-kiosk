import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  @Input() product: any

  constructor() { }

  ngOnInit(): void {
  }

  isDisabled(){
    return this.product.quantity<= 1
  }

  addUnit(e: any){
    e.stopPropagation()
    this.product.quantity++
  }

  removeUnit(e: any){
    e.stopPropagation()
    this.product.quantity--
  }

}
