import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [FormsModule, CommonModule, TaskItemComponent],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
	todoList: any[] = [
		{ title: 'Example Task 1', description: 'Description for task 1', completed: false },
		{ title: 'Example Task 2', description: 'Description for task 2', completed: true },
		// Add more initial tasks if needed
	];

	newItem: any = {
		title: '',
		description: '',
		completed: false
	};

	addItem() {
		if (this.newItem.title.trim() !== '') {
			this.todoList.push({ ...this.newItem });
			this.clearNewItem();
		}
	}

	clearNewItem() {
		this.newItem = {
			title: '',
			description: '',
			completed: false
		};
	}
}
