import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/internal/operators/tap';
import { noop } from 'rxjs/internal/util/noop';

import { AppState } from '../../reducers';
import { Login } from '../auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: [ 'test@angular-university.io', [ Validators.required ] ],
      password: [ 'test', [ Validators.required ] ]
    });
  }

  ngOnInit() {

  }

  login() {
    const formValue = this.form.value;
    this.auth.login(formValue.email, formValue.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new Login({user}));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );
  }
}
