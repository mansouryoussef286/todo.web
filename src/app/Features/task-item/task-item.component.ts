import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './task-item.component.html',
	styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
	item: any =
		{ title: 'Example Task 1', description: 'Description for task 1', completed: false };

}
