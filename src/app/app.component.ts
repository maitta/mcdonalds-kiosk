import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MachineService } from './machine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McDonald\'s Kiosk';
  products: any;
  machineService: MachineService;

  constructor(private titleService: Title, private machine: MachineService){
    this.titleService.setTitle(this.title);
    this.products = machine.getData().products;
    this.machineService = machine;
  }

  toggleActive(product: any){
    this.machine.toggleActive(product)
  }

  isShowTotal(){
    return this.machineService.getTotal() > 0;
  }
}
