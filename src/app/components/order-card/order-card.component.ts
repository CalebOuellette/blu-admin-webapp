import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { OrderItemProps, Order, OrderProps, OrderItem, CustomerProps, Customer } from '../../../../blu-classes';

@Component({
  selector: 'blu-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {


  @Input() order: OrderProps;

  constructor( public fireDb: AngularFireDatabase){}

  
  public orderItems: FirebaseListObservable<OrderItemProps[]>;
  public customer: FirebaseObjectObservable<CustomerProps>;


  ngOnInit() {
    this.orderItems = this.fireDb.list(OrderItem.dbAddress, {
      query: {
        orderByChild: 'orderID',
        equalTo: this.order.$key
      }
    });
    this.customer = this.fireDb.object(Customer.dbAddress  + "/" + this.order.customerID);
    
    
  }

}
