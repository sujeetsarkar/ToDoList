import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInfo } from '../models';
import { constant } from '../helpers/constant';



@Injectable({ providedIn: 'root' })
export class UserManagementService {

    constructor(private http: HttpClient) {
    }
    registerUser(userInfo: UserInfo) {
        return this.http.post<any>(`${constant.toDoListAPIUrl}/api/AddUser`, userInfo)
            .pipe(map((response: any) => {
                return response.value;
        },
        (error: any) => {
            console.log(error);
        }));
    }
}
