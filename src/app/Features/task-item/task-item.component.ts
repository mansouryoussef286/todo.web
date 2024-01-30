import { TaskItem } from '@App/Common/Models/TaskItem.Model';
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

	constructor() {
		console.log(this.item);

	}
}
