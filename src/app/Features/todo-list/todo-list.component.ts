import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { TaskItem } from '@App/Common/Models/TaskItem.Model';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Loader/Loader';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [FormsModule, CommonModule, TaskItemComponent, LoaderComponent],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
	todoList!: TaskItem.Model[];
	newItem: TaskItem.Model = new TaskItem.Model();
	IsLoaded: boolean = false;
	IsAdded: boolean = false;

	constructor(private HttpService: HttpService) { }

	ngOnInit(): void {
		this.GetTasks();
	}

	GetTasks() {
		let endPoint = HttpEndPoints.Tasks.GetAll;
		this.HttpService.Get<TaskItem.Model[]>(endPoint).subscribe(data => {
			this.IsLoaded = true;
			this.todoList = data;
		});
	}

	addItem() {
		if (this.newItem.title.trim() === '') return;
		this.IsAdded = false;

		const newItem = {
			title: this.newItem.title,
			description: this.newItem.description
		} as TaskItem.Model;

		let endPoint = HttpEndPoints.Tasks.Create;
		this.HttpService.Post<TaskItem.ReqModel, TaskItem.Model>(endPoint, newItem).subscribe(data => {
			this.IsAdded = true;
			this.todoList.push(data);
		});
	}
}
