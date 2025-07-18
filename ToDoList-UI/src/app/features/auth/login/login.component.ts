import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Login } from '../../../models';
import { AuthenticationService } from '../../../services';
import { CommonModule } from '@angular/common';


@Component({ templateUrl: 'login.component.html', imports: [CommonModule, ReactiveFormsModule] })
export class LoginComponent implements OnInit {
    loginForm: any;
    loading = false;
    submitted = false;
    returnUrl: string = '';
    error = '';
    userCredentials: Login | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.userCredentials = {
            UserName: '',
            Password: ''
        };
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm!.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm!.invalid) {
            return;
        }
        this.userCredentials!.UserName = this.f['username'].value;
        this.userCredentials!.Password = this.f['password'].value;
        this.loading = true;
        this.authenticationService.login1(this.userCredentials!)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    onRegister() {
        this.router.navigate(['/register']);
    }
}
