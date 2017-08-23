import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { OrderItemProps, Order, AppSettings, AppSettingsProps } from '../../../../blu-classes';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public afAuth: AngularFireAuth, public router: Router, public fireDb: AngularFireDatabase) { }

  public orderList: FirebaseListObservable<OrderItemProps[]>;
  public appSettings: FirebaseObjectObservable<AppSettingsProps>;

  public hasAuth: boolean = false;

  public authSub: Subscription;

  public resultCount: number = 100;

  public isOpen: boolean;

  ngOnInit() {
    this.authSub = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user && !user.isAnonymous) {
        this.fireDb.object("Users/" +  user.uid).update({lastLogin: new Date().getTime()});
        this.fireDb.object("Users/" + user.uid).subscribe((user) => {
          if (user.isAdmin === true) {
            this.hasAuth = true;
          }
        });
      }
    });

    this.appSettings = this.fireDb.object(AppSettings.dbAddress);
    this.appSettings.subscribe((data: AppSettingsProps)=>{
      this.isOpen = data.isOpen;
    });
    
    this.orderList = this.fireDb.list(Order.dbAddress, {
      query: {
        orderByChild: "createdDate"
      }
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["login"]);
  }

  setIsOpen(value: boolean) {
    this.appSettings.update({
      isOpen: value
    });
  }

}
