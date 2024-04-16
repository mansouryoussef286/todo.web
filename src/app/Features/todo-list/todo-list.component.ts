import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { TaskItem } from '@App/Common/Models/TaskItem.Model';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Loader/Loader';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [FormsModule, CommonModule, TaskItemComponent, LoaderComponent, FontAwesomeModule],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
	todoList!: TaskItem.Model[];
	filteredTodoList!: TaskItem.Model[];
	newItem: TaskItem.Model = new TaskItem.Model();
	IsLoaded: boolean = false;
	IsAdded: boolean = true;
	faPlus = faPlus;

	constructor(private HttpService: HttpService, private AuthenticationService: AuthenticationService) { }

	ngOnInit(): void {
		this.GetTasks();
	}

	GetTasks() {
		let endPoint = HttpEndPoints.Tasks.GetAll;
		this.HttpService.Get<TaskItem.Model[]>(endPoint).subscribe(data => {
			this.IsLoaded = true;
			this.todoList = data;
			this.filterTasks();
		});
	}

	filterTasks() {
		this.filteredTodoList = this.todoList.filter(t => t.Status == TaskItem.Status.NotCompleted);
	}

	addItem() {
		if (this.newItem.Title.trim() === '') return;
		this.IsAdded = false;

		const newItem = {
			Title: this.newItem.Title,
			Description: this.newItem.Description,
			UserId: this.AuthenticationService.CurrentUser.Id
		} as TaskItem.ReqModel;

		let endPoint = HttpEndPoints.Tasks.Create;
		this.HttpService.Post<TaskItem.ReqModel, TaskItem.Model>(endPoint, newItem).subscribe(data => {
			this.IsAdded = true;
			this.todoList.push(data);
			this.newItem = new TaskItem.Model();
		});
	}
}
