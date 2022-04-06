import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/cheeses.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cheeses-tab',
  templateUrl: './cheeses-tab.component.html',
  styleUrls: ['./cheeses-tab.component.css'],
})
export class CheesesTabComponent implements OnInit {
   products: any[] = [];
  carts: any[] = [];

  purchaseArray= [{}];


  openModal : boolean = false;
  selectedCheese: {} = null;

  contentLoadedSups: boolean = false;
  contentLoadedProds: boolean = false;
  _currency = 'CDF';
  serverMsg: string;
  errorMsg: any;
  currency: Object;
  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    //fetch products
    this.productService.getCheeses().subscribe((prods) => {
      this.products = prods;
      this.contentLoadedProds = true;
    });    
  }

  //Add to cart function
  addToCart(id: number) {
    console.log('Added to cart');
    console.log(id);
    this.cartService.AddProductToCart(id);
  }

  viewDetails(cheeseId: number){
    this.selectedCheese = this.products.filter(x=>x.id == cheeseId)[0];
    this.openModal = true;

    console.log(this.purchaseArray)
  }

  closeModal(){
    this.openModal = false;
    this.selectedCheese = null;
  }
}
