import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserInfo } from 'src/app/models';
import { UserManagementService } from 'src/app/services/usermanagement.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    newUser: UserInfo;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userManagementService: UserManagementService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            confirmemail: ['', Validators.required],
            mobile: ['', Validators.required],
            password: ['', Validators.required],
            confirmpassword: ['', Validators.required]
        });
        this.newUser = {
            FirstName: '',
            LastName: '',
            UserName: '',
            Email: '',
            PhoneNumber: '',
            PasswordHash: ''
        };
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }
    // emailConfirmValidator(control: FormControl) {
    //     if (control.value !== this.f.email) {
    //         return { invalidEmail: true };
    //     }
    //     return null;
    // }
    // passwordConfirmValidator(control: FormControl) {
    //     if (control.value !== this.f.password) {
    //         return { invalidPassword: true };
    //     }
    //     return null;
    // }
    MatchPassword(control: AbstractControl) {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmpassword').value;
        if (password !== confirmPassword) {
          control.get('confirmPassword').setErrors({ confirmPassword: true });
        } else {
          return null;
        }
    }
    MatchEmail(control: AbstractControl) {
        const email = control.get('email').value;
        const confirmemail = control.get('confirmemail').value;
        if (email !== confirmemail) {
          control.get('confirmemail').setErrors({ confirmemail: true });
        } else {
          return null;
        }
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    getUserName() {
        const name = this.f.email.value.toString().split('@');
        return name[0];
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.newUser = {
            FirstName: this.f.firstname.value,
            LastName: this.f.lastname.value,
            UserName: this.getUserName(),
            Email: this.f.email.value,
            PhoneNumber: this.f.mobile.value,
            PasswordHash: this.f.password.value
        };
        this.loading = true;
        this.userManagementService.registerUser(this.newUser)
            .pipe(first())
            .subscribe(
                data => {
                    alert('Successfully registered');
                    this.router.navigate(['/login']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
}
