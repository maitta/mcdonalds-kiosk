import { Injectable } from '@angular/core';

const products = [
  {
      "photo": "assets/img/big-mac.png",
      "name": "Big Mac",
      "price": 5.99,
      "active": false,
      "quantity": 1
  },
  {
      "photo": "assets/img/mc-chicken.png",
      "name": "Mc Chicken",
      "price": 4.99,
      "active": false,
      "quantity": 1
  },
  {
      "photo": "assets/img/double-cb.png",
      "name": "Double Cheese Burger",
      "price": 2.99,
      "active": false,
      "quantity": 1
  },
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
  },
  {
      "photo": "assets/img/cola.png",
      "name": "Coke",
      "price": 1.99,
      "active": false,
      "quantity": 1
  },
  {
      "photo": "assets/img/lipton.png",
      "name": "Ice Tea",
      "price": 1.99,
      "active": false,
      "quantity": 1
  },
  {
      "photo": "assets/img/water.png",
      "name": "Water",
      "price": 1.49,
      "active": false,
      "quantity": 1
  }
];

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  products: any;

  constructor() { 
    this.products = products;
  }

  public getData() {
      return {
          products: products,
          orderTotal: 0
      }
  }

  toggleActive(item: any){
      item.active = !item.active;
  }

  getTotal(): number{
      var total = 0;
      this.products.forEach(function(item: any){
          if (item.active){
              total+= item.price * item.quantity;
          }
      });
      return parseFloat(total.toFixed(2));
    }
}
