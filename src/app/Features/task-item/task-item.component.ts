import { TaskItem } from '@App/Common/Models/TaskItem.Model';
import { HttpService } from '@App/Common/Services/Http.Service';
import { TaskItemsService } from '@App/Common/Services/TaskItems.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [FormsModule, FontAwesomeModule],
	templateUrl: './task-item.component.html',
	styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
	@Input('TaskItem') item!: TaskItem.Model;
	faCheck = faCheck;
	faTrash = faTrashAlt;

	constructor(
		private HttpService: HttpService,
		private TaskItemsService: TaskItemsService
	) {
	}

	ToggleItemStatus() {
		this.TaskItemsService.ToggleItemStatus(this.item.Id);
	}

	Delete() {
		this.TaskItemsService.Delete(this.item.Id);
	}
}
