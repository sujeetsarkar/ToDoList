import { Component, OnInit, ViewChild } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { AuthenticationService } from 'src/app/services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToDo } from 'src/app/models/todo.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = false;
    displayedColumns: string[] = ['ListName', 'Description'];
    dataSource: any;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    // dataSource: any;

    constructor(private toDoService: ToDoService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        const curUser = this.authenticationService.currentUserValue;

        this.toDoService.getAllToDo(curUser.UserName).subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<ToDo>(data.Value);
            this.loading = false;
            this.dataSource.paginator = this.paginator;
        },
        (error: any) => {
            console.log(error);
        });
    }
}
