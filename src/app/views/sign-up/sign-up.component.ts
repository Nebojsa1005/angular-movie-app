import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  storeUserSub?: Subscription

  formGroup = this.fb.group({
    fullName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  newUser: any
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.storeUserSub?.unsubscribe()    
  }

  submit() {
    if (!this.formGroup.valid) {
      return
    } 
    this.storeUserSub = this.userService.storeUser({
      ...this.formGroup.value
    }).subscribe(data => {
      this.formGroup.reset()      
      this.router.navigate(['/list/1'], { queryParams: {userId: data.name} })
    
    })
  }

}
