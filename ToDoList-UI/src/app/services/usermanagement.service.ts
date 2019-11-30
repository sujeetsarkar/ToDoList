import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInfo } from '../models';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class UserManagementService {

    constructor(private http: HttpClient) {
    }
    registerUser(userInfo: UserInfo) {
        return this.http.post<any>(`${environment.toDoListAPIUrl}/api/AddUser`, userInfo)
            .pipe(map((response: any) => {
                return response.value;
        },
        (error: any) => {
            console.log(error);
        }));
    }
}
