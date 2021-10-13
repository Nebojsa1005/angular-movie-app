import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  formGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
  }

  submit() {
    this.usersService.getUserAfterSignIn(this.formGroup.value).subscribe(data => {
      let user  
      for(let key in data) { 
        if (data[key].email === this.formGroup.get('email')?.value) {         
          user = data[key]
          user.id = key
          this.usersService.currentUser.next(user)          
        }
      }      
      this.router.navigate(['list/1'], { queryParams: {userId: user.id} })
    })
  }

}
