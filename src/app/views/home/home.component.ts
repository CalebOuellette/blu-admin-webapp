import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { OrderItemProps, Order } from '../../../../blu-classes';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, public fireDb: AngularFireDatabase) { }

  public orderList: FirebaseListObservable<OrderItemProps[]>;

  ngOnInit() {
    this.orderList = this.fireDb.list(Order.dbAddress, {
      query: {
              limitToLast: 1000
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["login"]);
  }

}
