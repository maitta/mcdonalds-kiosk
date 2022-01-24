import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ProductComponent } from './product/product.component'
import { QuantityComponent } from './quantity/quantity.component'
import { OrderDetailsComponent } from './order-details/order-details.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    QuantityComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
