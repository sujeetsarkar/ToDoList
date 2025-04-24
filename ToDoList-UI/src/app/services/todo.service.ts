import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInfo } from '../models';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class ToDoService {

    constructor(private http: HttpClient) {
    }
    getAllToDo(userInfo: string) {
        return this.http.get<any>(`${environment.toDoListAPIUrl}/api/GetAllItems/` + userInfo);
    }
}
