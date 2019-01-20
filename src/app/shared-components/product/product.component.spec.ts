import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let element: HTMLElement;
  beforeEach(async(() => {

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [ProductComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = {
      'description': 'Wolrd Pay Manual Book',
      'value': { 'currency': 'GBP', 'amount': 10 }
    };
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the product component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a description', () => {
    expect(component).toBeTruthy();
    const title = element.querySelector('mat-card-title');
    expect(title.textContent).toEqual(component.product.description);
  });

  it('should have a price and the correct currency', () => {
    expect(component).toBeTruthy();
    const price = element.querySelector('.price');
    expect(price.textContent).toEqual('Price: £10.00');
  });
});
