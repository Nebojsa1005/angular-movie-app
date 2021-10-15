import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }


  currentUser?: User
  currentUserSub?: Subscription

  ngOnInit(): void {
    this.usersService.currentUser.subscribe(data => {
      this.currentUser = data      
    })
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe()  
  }

  signOut() {
    this.usersService.currentUser.next(null)
    this.router.navigate(['sign-in']) 
  }
}
