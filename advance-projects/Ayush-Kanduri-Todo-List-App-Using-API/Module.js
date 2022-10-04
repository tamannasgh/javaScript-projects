//Revealing Module Pattern using IIFE Module Design Pattern
//Welcome Function using IIFE (Immediately Invoked Function Expression)//
let TodoApp = (function () {
	var a = 10;
	let tasksList = [];
	const ulElement = document.getElementById("list");
	const inputElement = document.getElementById("add");
	const tasksCounterSpanElement = document.getElementById("tasks-counter");

	//----------------------------------------------------------------
	//Fetch Todos using fetch() API - using Promises - GET//
	let fetchTodos = () => {
		//GET API
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				console.log(data);
				tasksList = data.slice(0, 10);
				renderList();
			});
	};
	//----------------------------------------------------------------
	//Fetch Todos using fetch() API - using Promises & Async Await - GET//
	/*let fetchTodos = async () => {
	//GET API
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/todos"
		);
		const data = await response.json();
		console.log(response);
		console.log(data);
		tasksList = data.slice(0, 10);
		renderList();
	} catch (err) {
		console.log(err);
	}
};*/
	//----------------------------------------------------------------
	//Fetch Todos using fetch() API - using Promises & Async Await - POST//
	/*let addTask = async (task) => {
	if (task) {
		//POST API
		try {
			let response = await fetch(
				"https://jsonplaceholder.typicode.com/todos",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				}
			);
			let data = await response.json();
			console.log(data);
			tasksList.push(task);
			renderList();
			showNotification("Task added successfully !!!");
		} catch (err) {
			showNotification("Task cannot be added !!!");
			console.log("Error: ", err);
		}
	} else {
		showNotification("Task cannot be added !!!");
	}
};*/
	//----------------------------------------------------------------
	//Fetch Todos using fetch() API - using Promises - POST//
	/*let addTask = (task) => {
//POST API
if (task) {
	fetch("https://jsonplaceholder.typicode.com/todos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			tasksList.push(task);
			renderList();
			showNotification("Task added successfully !!!");
		})
		.catch((err) => {
			showNotification("Task cannot be added !!!");
			console.log("Error: ", err);
		});
} else {
	showNotification("Task cannot be added !!!");
}
};*/
	//----------------------------------------------------------------
	//Adding Task into TasksList Function//
	let addTask = (task) => {
		if (task) {
			tasksList.push(task);
			renderList();
			showNotification("Task added successfully !!!");
			return;
		}
		showNotification("Task cannot be added !!!");
	};
	//----------------------------------------------------------------
	//Render TasksList Function//
	let renderList = () => {
		ulElement.innerHTML = "";
		for (let i = 0; i < tasksList.length; i++) {
			addTaskToDOM(tasksList[i]);
		}
		tasksCounterSpanElement.innerHTML = tasksList.length.toString();
	};
	//----------------------------------------------------------------
	//Handle Input Function//
	let handleInput = (event) => {
		if (event.key === "Enter") {
			const title = event.target.value;
			if (!title) {
				showNotification("Task cannot be empty !!!");
				return;
			}
			const task = {
				title,
				// id: Date.now().toString(),
				id: Date.now(),
				completed: false,
			};
			event.target.value = "";
			addTask(task);
		}
	};
	//----------------------------------------------------------------
	//Show Notifications Function//
	let showNotification = (title) => {
		alert(title);
	};
	//----------------------------------------------------------------
	//Delete Task from TasksList Function//
	let deleteTask = (taskId) => {
		const newTasksList = tasksList.filter(
			(task) => task.id !== Number(taskId)
		);
		tasksList = newTasksList;
		renderList();
		showNotification("Task Deleted Successfully !!!");
	};
	//----------------------------------------------------------------
	//Toggle the Task Function//
	let toggleTask = (taskId) => {
		const task = tasksList.filter((task) => task.id === Number(taskId));
		if (task.length > 0) {
			const currentTask = task[0];
			currentTask.completed = !currentTask.completed;
			renderList();
			showNotification("Task toggled successfully !!!");
			return;
		}
		showNotification("Could not toggle the task !!!");
	};
	//----------------------------------------------------------------
	//Render the Task into the Screen Function//
	let addTaskToDOM = (task) => {
		const li = document.createElement("li");
		li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${
			task.completed ? "checked" : ""
		} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}"/>
    `;
		ulElement.append(li);
	};
	//----------------------------------------------------------------
	//Handle the Click Function//
	let handleClick = (event) => {
		const target = event.target;
		if (target.className === "delete") {
			const taskId = target.dataset.id;
			deleteTask(taskId);
			return;
		} else if (target.className === "custom-checkbox") {
			const taskId = target.id;
			toggleTask(taskId);
			return;
		}
	};
	//----------------------------------------------------------------
	//Initialize App Function to call the Events and APIs//
	let initializeApp = () => {
		//Fetch API Function
		fetchTodos();
		//Key Event Listener Attached
		inputElement.addEventListener("keyup", handleInput);
		//Click Event Listener Attached using ED (Event Delegation)
		document.addEventListener("click", handleClick);
	};
	return {
		initialize: initializeApp,
		a: a,
	};
	//----------------------------------------------------------------
})();
