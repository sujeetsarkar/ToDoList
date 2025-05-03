import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Login, UserInfo } from '../models';
import { constant } from '../helpers/constant';
import { isPlatformBrowser } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserInfo | null>;
    public currentUser: Observable<UserInfo | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserInfo | null>(JSON.parse(this.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserInfo | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${constant.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    login1(credential: Login) {
        return this.http.post<any>(`${constant.toDoListAPIUrl}/api/users/authenticate`, credential)
            .pipe(map((user: UserInfo) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        this.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private platformId = inject(PLATFORM_ID);

    getItem(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
        return null;
    }

    setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
    }
}
