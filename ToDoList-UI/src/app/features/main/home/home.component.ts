import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ToDoService } from '../../../services/todo.service';
import { AuthenticationService } from '../../../services';
import { ToDo } from '../../../models/todo.model';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgIf, MatPaginatorModule, MatTableModule]
})
export class HomeComponent implements OnInit {
    loading = false;
    displayedColumns: string[] = ['ListName', 'Description'];
    dataSource: any;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | undefined;
    // dataSource: any;

    constructor(private toDoService: ToDoService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        const curUser = this.authenticationService.currentUserValue;

        this.toDoService.getAllToDo(curUser?.UserName!).subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<ToDo>(data.Value);
            this.loading = false;
            this.dataSource.paginator = this.paginator;
        },
        (error: any) => {
            console.log(error);
        });
    }
}
