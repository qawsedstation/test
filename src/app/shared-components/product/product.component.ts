import { Component, OnInit, Input } from '@angular/core';

interface Product {
  description: string;
  value: Value;
}

interface Value {
  currency: string;
  amount: number;
}

@Component({
  selector: 'worldpay-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  @Input() product: Product;

  ngOnInit() {
  }

}
