import { TaskItem } from '@App/Common/Models/TaskItem.Model';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './task-item.component.html',
	styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
	@Input('TaskItem') item!: TaskItem.Model;

	constructor(
		private HttpService: HttpService
	) {
		console.log(this.item);
	}

	ToggleItemStatus() {
		let endPoint = HttpEndPoints.Tasks.ToggleStatus;
		endPoint = endPoint.replace('{id}', this.item.Id.toString());
		this.HttpService.Put<any, boolean>(endPoint, '').subscribe(isToggled => {
			if (isToggled) {
				// hide it and add linethrough and so on
			}
		});
	}
}
