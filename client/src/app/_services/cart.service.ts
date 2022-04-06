import { Injectable } from '@angular/core';
import { ProductsService } from './cheeses.service';
import { CartModelPublic } from '../_models/cart';
import { Cheese } from '../_models/cheese';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private server_url = environment.serverURL;
  //Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {};

  /*OBSERVABLES FOR THE COMPONENT TO SUBSCRIBE */
  cartTotals$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartModelPublic>(this.cartDataClient);
  productData$ = new BehaviorSubject<Cheese[]>([]);

  constructor(private productsService: ProductsService, private http: HttpClient) {
    //fetch cheeses
    this.productsService.getCheeses().subscribe((prods) => {
      this.productData$.next(prods);
    });
  }

  AddProductToCart(id: Number) {
    // if not in cart
    const stringID = id.toString();
    if (this.cartDataClient[stringID] === undefined) {
      // add to cart
      this.cartDataClient[stringID] = 1;
    } else {
      this.cartDataClient[stringID]++;
    }
    this.cartDataObs$.next(this.cartDataClient);
    // console.log(this.cartDataClient);
  }

  // For incrementing and decrementing items in the cart
  // if count is positive, increment, otherwise decrement
  ModifyProductCount(id: string, count: number) {
    if (count > 0) {
      this.cartDataClient[id]++;
      this.cartDataObs$.next(this.cartDataClient);
      return;
    }

    // subtract one
    if (this.cartDataClient[id] > 1) {
      this.cartDataClient[id]--;
      this.cartDataObs$.next(this.cartDataClient);
      return;
    }

    delete this.cartDataClient[id];
    this.cartDataObs$.next(this.cartDataClient);
  }

  PurchaseProducts(){
    this.http.post(this.server_url + '/cart/Purchase', this.cartDataClient).subscribe(response=>{
      console.log(this.cartDataClient)
      this.cartDataClient = {};
      
      this.cartDataObs$.next(this.cartDataClient);
      
    }, error=>{
    });
  }

  GetRecentPurchases(): Observable<any>{
    return this.http.get(this.server_url + '/cart/GetRecentPurchases');
  }
}
