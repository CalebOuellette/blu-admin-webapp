import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(["login"]);
  }

}
