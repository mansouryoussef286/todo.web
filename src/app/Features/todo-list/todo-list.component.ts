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
import { TaskItemsService } from '@App/Common/Services/TaskItems.Service';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [FormsModule, CommonModule, TaskItemComponent, LoaderComponent, FontAwesomeModule],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
	filteredTodoList!: TaskItem.Model[];
	newItem: TaskItem.Model = new TaskItem.Model();

	IsLoaded: boolean = false;
	IsAdded: boolean = true;
	ShowAll!: boolean;

	faPlus = faPlus;

	constructor(
		private HttpService: HttpService,
		private AuthenticationService: AuthenticationService,
		private TaskItemsService: TaskItemsService,
	) { }

	ngOnInit(): void {
		this.GetTasks();
	}

	async GetTasks() {
		this.TaskItemsService.filteredTodoList$.subscribe(list => {
			this.filteredTodoList = list;
		});
		this.TaskItemsService.showAll$.subscribe(show => {
			this.ShowAll = show;
		});
		await this.TaskItemsService.GetTasks();
		this.IsLoaded = true;
	}

	async addItem() {
		if (this.newItem.Title.trim() === '') return;
		this.IsAdded = false;

		const newItem = {
			Title: this.newItem.Title,
			Description: this.newItem.Description,
			UserId: this.AuthenticationService.CurrentUser.Id
		} as TaskItem.ReqModel;

		await this.TaskItemsService.addItem(newItem);

		this.newItem = new TaskItem.Model();
		this.IsAdded = true;
	}

	ToggleShowAll() {
		this.TaskItemsService.ToggleShowAll();
	}
}
