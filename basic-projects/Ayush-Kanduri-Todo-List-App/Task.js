//----------------------------------------------------------------
//Class: Task Details//
class Task {
	constructor(taskTitle) {
		this.taskTitle = taskTitle;
		this.id = Date.now();
		this.completed = false;
		this.description = "Task Description";
		this.reminder = {
			date: new Date().toISOString().slice(0, 10),
			// date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString(),
			// time: new Date().toISOString().slice(11, 16),
			ON: false,
		};
		this.priority = "low";
		this.repeat = {
			when: "never",
			ON: false,
		};
	}
}
//----------------------------------------------------------------
