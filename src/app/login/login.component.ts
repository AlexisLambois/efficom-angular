import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  returnUrl: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  connection(): void {
    this.loginService.createTeam(this.email, this.password).then(res => {
      console.log(res);
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
