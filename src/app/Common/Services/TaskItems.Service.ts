import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { TaskItem } from '../Models/TaskItem.Model';

@Injectable({ providedIn: 'root' })
export class TaskItemsService {
	filteredTodoList$: Subject<TaskItem.Model[]> = new Subject<TaskItem.Model[]>();
	showAll$: Subject<boolean> = new Subject<boolean>();

	private todoList!: TaskItem.Model[];
	private filteredTodoList!: TaskItem.Model[];
	private showAll!: boolean;

	constructor(
		private HttpService: HttpService
	) { }

	private filterTasks() {
		if (!this.showAll)
			this.filteredTodoList = this.todoList.filter(t => t.Status == TaskItem.Status.NotCompleted);
		else
			this.filteredTodoList = this.todoList;
	}

	private PublishTasks() {
		this.filteredTodoList$.next(this.filteredTodoList);
	}

	async GetTasks() {
		let endPoint = HttpEndPoints.Tasks.GetAll;
		this.todoList = await firstValueFrom(this.HttpService.Get<TaskItem.Model[]>(endPoint));
		this.filterTasks();
		this.PublishTasks();
	}

	async addItem(newItem: TaskItem.ReqModel) {
		let endPoint = HttpEndPoints.Tasks.Create;
		const addedItem = await firstValueFrom(this.HttpService.Post<TaskItem.ReqModel, TaskItem.Model>(endPoint, newItem));
		this.todoList.push(addedItem);
		this.filterTasks();
		this.PublishTasks();
	}


	async ToggleItemStatus(id: number) {
		let endPoint = HttpEndPoints.Tasks.ToggleStatus;
		endPoint = endPoint.replace('{id}', id.toString());
		const isToggled = await firstValueFrom(this.HttpService.Put<any, boolean>(endPoint, ''));
		if (isToggled) {
			// hide it and add linethrough and so on
			const item = this.todoList.find(item => item.Id == id)!;
			item.Status = TaskItem.Status.Completed;
		}
		this.filterTasks();
		this.PublishTasks();
	}

	async Delete(id: number) {
		let endPoint = HttpEndPoints.Tasks.Delete;
		endPoint = endPoint.replace('{id}', id.toString());
		await firstValueFrom(this.HttpService.Delete(endPoint));
		// hide it and add linethrough and so on
		this.todoList = this.todoList.filter(item => item.Id != id);
		this.filterTasks();
		this.PublishTasks();
	}

	ToggleShowAll() {
		this.showAll = !this.showAll;
		this.showAll$.next(this.showAll);
		this.filterTasks();
		this.PublishTasks();
	}
}