import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constant } from '../helpers/constant';



@Injectable({ providedIn: 'root' })
export class ToDoService {

    constructor(private http: HttpClient) {
    }
    getAllToDo(userInfo: string) {
        return this.http.get<any>(`${constant.toDoListAPIUrl}/api/GetAllItems/` + userInfo);
    }
}
