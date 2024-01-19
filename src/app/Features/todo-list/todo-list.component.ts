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
	todoList: TaskItem[] = [
		{ Id: 1, title: 'Example Task 1', description: 'Description for task 1', completed: false, CreatedAt: new Date(), UpdatedAt: new Date() },
		{ Id: 2, title: 'Example Task 2', description: 'Description for task 2', completed: false, CreatedAt: new Date(), UpdatedAt: new Date() }
	];

	newItem: TaskItem = {
		Id: 0,
		title: '',
		description: '',
		completed: false,
		CreatedAt: new Date(),
		UpdatedAt: new Date()
	};
	IsLoaded: boolean = false;

	constructor(private HttpService: HttpService) { }

	ngOnInit(): void {
		this.GetTasks();
	}

	GetTasks() {
		let endPoint = HttpEndPoints.Tasks.GetAll
		this.HttpService.Get<TaskItem[]>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.todoList = data
		})
	}

	addItem() {
		if (this.newItem.title.trim() !== '') {
			this.todoList.push({ ...this.newItem, Id: 3 });
			this.clearNewItem();
		}
	}

	clearNewItem() {
		this.newItem = {
			Id: 0,
			title: '',
			description: '',
			completed: false,
			CreatedAt: new Date(),
			UpdatedAt: new Date()
		};
	}
}
