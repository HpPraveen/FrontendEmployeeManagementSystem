import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  username = 'admin';
  password = 'admin';

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginClick(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/employee']);
      this.toastr.success('Successfully logged-in');
    } else {
      this.toastr.error('Check Your login credentail !');
    }
  }

}
