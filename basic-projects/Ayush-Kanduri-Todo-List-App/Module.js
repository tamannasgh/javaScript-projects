//Revealing Module Pattern using IIFE Module Design Pattern.
//----------------------------------------------------------------
let todoApp = (() => {
	//Declarations
	let tempId;
	const inputTask = document.getElementById("task");
	const submitTask = document.getElementById("taskSubmit");
	const upperTabs = document
		.querySelectorAll(".tabs-box")[0]
		.querySelectorAll(".tabs");
	const lowerTabs = document
		.querySelectorAll(".tabs-box")[1]
		.querySelectorAll(".tabs");
	const allTabContent = document.querySelectorAll(".scroll > .content")[0];
	const incompleteTabContent =
		document.querySelectorAll(".scroll > .content")[1];
	const completedTabContent =
		document.querySelectorAll(".scroll > .content")[2];
	let taskItemTemplate = allTabContent.querySelector(".task").cloneNode(true);
	taskItemTemplate.style.display = "flex";
	//----------------------------------------------------------------
	//Function: Set the Current Date on the Display Banner//
	const setDate = (() => {
		const today =
			new Date().toDateString().split(" ").slice(0, 1) +
			", " +
			new Date().toDateString().split(" ").slice(1, 4).join(" ");
		document.querySelector(".hoverDisplay #today").textContent = today;
	})();
	//----------------------------------------------------------------
	//Function: Displays the Number of Tasks Left in the DOM Screen//
	const taskCount = () => {
		const taskList = getLocalStorage("taskList");
		const count = taskList.filter((task) => task.completed === false).length;
		lowerTabs[1].textContent = `${count} Tasks Left`;
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the DOM Screen//
	const addTaskToDOM = (task) => {
		taskItemTemplate.querySelector(".text p").textContent = task.taskTitle;
		taskItemTemplate.querySelector(".text p").id = task.id;
		//To maintain if the task is checked or not.
		if (task.completed === true) {
			taskItemTemplate
				.querySelector(".text p")
				.classList.add("line-through");
		} else {
			taskItemTemplate
				.querySelector(".text p")
				.classList.remove("line-through");
		}
		//Appends the node to the DOM
		allTabContent.appendChild(taskItemTemplate);
		//Clones the Task Item Template Node
		taskItemTemplate = taskItemTemplate.cloneNode(true);
	};
	//----------------------------------------------------------------
	//Function: Deletes the Tasks from the DOM Screen//
	const deleteTasksFromDOM = () => {
		//Tabs Array containing all the Content from all the Tabs Combined in the DOM Screen
		const tabs = [
			...allTabContent.querySelectorAll("div.task"),
			...incompleteTabContent.querySelectorAll("div.task"),
			...completedTabContent.querySelectorAll("div.task"),
		];
		//Removes the Content from the DOM Screen
		tabs.forEach((element) => element.remove());
	};
	//----------------------------------------------------------------
	//Function: Renders the Tab Content//
	const renderTabContent = (taskList) => {
		//Adds the Tab Content from the Local Storage Task List into the DOM Screen
		taskList.forEach((task) => addTaskToDOM(task));
	};
	//----------------------------------------------------------------
	//Function: Renders the Task List//
	const renderTaskList = () => {
		let taskList = getLocalStorage("taskList");
		let activeTab = localStorage.getItem("active");
		if (taskList !== null) {
			if (taskList.length > 0) {
				//Removes the Content from the DOM Screen
				deleteTasksFromDOM();
				//Un-Highlights all the Tabs
				upperTabs.forEach((element) => element.classList.remove("active"));
				//Conditional Rendering for Tabs
				if (activeTab === "all") {
					//Highlights the "All" Tab
					upperTabs[0].classList.add("active");
					//All Tasks
					renderTabContent(taskList);
				} else if (activeTab === "incomplete") {
					//Highlights the "Incomplete" Tab
					upperTabs[1].classList.add("active");
					//Incomplete Tasks
					taskList = taskList.filter((task) => task.completed === false);
					renderTabContent(taskList);
				} else if (activeTab === "completed") {
					//Highlights the "Complete" Tab
					upperTabs[2].classList.add("active");
					//Completed Tasks
					taskList = taskList.filter((task) => task.completed === true);
					renderTabContent(taskList);
				}
				//Displays the Number of Tasks Left in the DOM Screen
				taskCount();
				return;
			}
		} else {
			upperTabs[0].classList.remove("active");
			upperTabs[1].classList.remove("active");
			upperTabs[2].classList.remove("active");
			deleteTasksFromDOM();
			lowerTabs[1].textContent = `${0} Tasks Left`;
		}
	};
	//----------------------------------------------------------------
	//Function: Adds the Task into the Task List//
	const addTask = (taskTitle) => {
		if (taskTitle) {
			const data = getLocalStorage("taskList");
			if (data) {
				data.push(new Task(taskTitle));
				setLocalStorage(data);
			} else {
				const taskList = [];
				const task = new Task(taskTitle);
				taskList.push(task);
				setLocalStorage(taskList);
			}
			renderTaskList();
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Adds the TaskList into the Browser Local Storage//
	const setLocalStorage = (taskList) => {
		if (taskList.length > 0) {
			window.localStorage.setItem("taskList", JSON.stringify(taskList));
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Fetches the TaskList from the Browser Local Storage//
	const getLocalStorage = (taskList) => {
		return JSON.parse(window.localStorage.getItem(taskList));
	};
	//----------------------------------------------------------------
	//Function: Checks/Unchecks Off the Task & Marks it as Completed/Incomplete//
	const taskCompletedToggle = (taskId) => {
		const taskList = getLocalStorage("taskList");
		taskList.forEach((task) => {
			if (task.id === Number(taskId)) {
				task.completed = !task.completed;
				setLocalStorage(taskList);
				renderTaskList();
				return;
			}
		});
	};
	//----------------------------------------------------------------
	//Function: Handles the KeyPress Events in the Todo List App//
	const handleKeyPress = (event) => {
		//Event.keyCode = 13 for "Enter" key
		if (event.key === "Enter") {
			const activeElement = document.activeElement;
			if (inputTask === activeElement) {
				//Calls the Click Event Listener on the Submit Task Button when the Enter Key is Pressed & the Focus is on the Input Task Element.
				submitTask.click();
			}
		}
	};
	//----------------------------------------------------------------
	//Function: Handles the Click Events in the Todo List App//
	const handleClick = (event) => {
		const target = event.target;
		//If the target is the "submit" button, then add the task to the list
		if (target.id === "taskSubmit") {
			//Optional Chaining Operator
			const taskTitle = inputTask?.value;
			if (taskTitle === "") return;
			//Sets "All" Tab as Active in Local Storage
			localStorage.setItem("active", "all");
			addTask(taskTitle);
			inputTask.focus();
			inputTask.value = "";
		}
		//If the target is the "check" button, then toggle the LineThrough Class
		if (target.id === "check") {
			const ele = target.parentNode.nextElementSibling.querySelector("p");
			ele.classList.toggle("line-through");
			taskCompletedToggle(ele.id);
			return;
		}
		//If the target is the "All-Tab" button, then display the Content of the Tab
		if (target.id === "all") {
			const taskList = getLocalStorage("taskList");
			if (taskList === null) return;
			if (taskList.length > 0) {
				localStorage.setItem("active", target.id);
				renderTaskList();
				return;
			}
		}
		//If the target is the "Incomplete-Tab" button, then display the Content of the Tab
		if (target.id === "incomplete") {
			let taskList = getLocalStorage("taskList");
			if (taskList === null) return;
			taskList = taskList.filter((task) => task.completed === false);
			if (taskList.length > 0) {
				localStorage.setItem("active", target.id);
				renderTaskList();
				return;
			}
		}
		//If the target is the "Completed-Tab" button, then display the Content of the Tab
		if (target.id === "completed") {
			let taskList = getLocalStorage("taskList");
			if (taskList === null) return;
			taskList = taskList.filter((task) => task.completed === true);
			if (taskList.length > 0) {
				localStorage.setItem("active", target.id);
				renderTaskList();
				return;
			}
		}
		//If the target is the "CompleteAll-Tab" button, then mark all the Tasks as Completed
		if (target.id === "complete-all") {
			let taskList = getLocalStorage("taskList");
			if (taskList.length > 0) {
				taskList.forEach((task) => {
					task.completed = true;
				});
				setLocalStorage(taskList);
				renderTaskList();
				return;
			}
		}
		//If the target is the "ClearCompleted-Tab" button, then clear all the completed Tasks
		if (target.id === "clear-completed") {
			let taskList = getLocalStorage("taskList");
			taskList = taskList.filter((task) => task.completed === false);
			if (taskList.length > 0) {
				setLocalStorage(taskList);
			} else {
				localStorage.clear();
			}
			renderTaskList();
			return;
		}
		//If the target is the "delete" button, then delete that task
		if (target.id === "delete") {
			const ele = target.parentNode.parentNode;
			const id = ele.querySelector(".text p").id;
			ele.classList.add("delete-animation");
			//SetTimeout to delete the Task after sometime after the delete animation is completed
			setTimeout(() => {
				const ele = target.parentNode.parentNode;
				const id = ele.querySelector(".text p").id;
				const taskList = getLocalStorage("taskList");
				if (taskList === null) {
					list = null;
					localStorage.clear();
					renderTaskList();
					return;
				}
				let list = taskList.filter((task) => task.id !== Number(id));
				//Remove the element after the animation is completed
				ele.addEventListener("transitionend", () => {
					ele.remove();
				});
				localStorage.removeItem("taskList");
				setLocalStorage(list);
				renderTaskList();
			}, 1000);
			return;
		}
		//If the target is the "edit" button, then edit that task
		if (target.id === "edit") {
			const taskEle = target.parentNode.parentNode.querySelector(".text p");
			const task = getLocalStorage("taskList").find(
				(task) => task.id === Number(taskEle.id)
			);
			const modal = document.getElementById("modal");
			//Modal Animation
			modal.classList.remove("hide");
			modal.classList.add("popIn");
			//Default Values of Input Text Field of Modal
			document.querySelector("#modal input[type='text']").value =
				task.taskTitle;
			document.querySelector("#modal #textarea").value = task.description;
			document.querySelector("#modal input[type='date']").value =
				task.reminder.date;
			document.querySelector("#modal input[type='time']").value =
				task.reminder.time;
			tempId = taskEle.id;
			return;
		}
		//If the target is the "cancel" button of Modal then exit that Modal
		if (target.id === "cancel") {
			const modal = document.getElementById("modal");
			//Modal Animation
			modal.classList.remove("popIn");
			modal.classList.add("popOut");
			//SetTimeout to hide the Modal after sometime after the animation is completed
			setTimeout(() => {
				modal.classList.remove("popOut");
				modal.classList.add("hide");
			}, 500);
			return;
		}
		//If the target is the "save" button of Modal then save that Modal
		if (target.id === "save") {
			const taskList = getLocalStorage("taskList");
			taskList.forEach((task) => {
				if (task.id === Number(tempId)) {
					task.taskTitle = document.querySelector(
						"#modal input[type='text']"
					).value;
					task.description =
						document.querySelector("#modal #textarea").value;
					task.reminder.date = document.querySelector(
						"#modal input[type='date']"
					).value;
					task.reminder.time = document.querySelector(
						"#modal input[type='time']"
					).value;
					task.priority = document.querySelector(
						'input[name="priority"]:checked'
					).value;
					task.repeat = document.querySelector(
						'input[name="repeat"]:checked'
					).value;
				}
			});
			setLocalStorage(taskList);
			const modal = document.getElementById("modal");
			//Modal Animation
			modal.classList.remove("popIn");
			modal.classList.add("popOut");
			//SetTimeout to hide the Modal after sometime after the animation is completed
			setTimeout(() => {
				modal.classList.remove("popOut");
				modal.classList.add("hide");
				renderTaskList();
			}, 500);
			return;
		}
		//If the target is the "Sun" Icon of the Banner then Toggle the Theme
		if (target.className === "fa-solid fa-sun") {
			//Moonrise
			document.querySelector(".hoverDisplay .fa-moon").id = "";
			document.querySelector(".hoverDisplay .fa-sun").id = "hide";
			//Theme Change
			document.body.style.backgroundColor = "black";
			for (let i = 1; i <= 4; i++) {
				document.getElementById(`circle${i}`).style.backgroundColor =
					"rgb(35, 35, 35)";
				document.getElementById(`circle${i}`).style.boxShadow =
					"0px 0px 30px 30px rgb(35, 35, 35)";
			}
			return;
		}
		//If the target is the "Moon" Icon of the Banner then Toggle the Theme
		if (target.className === "fa-solid fa-moon") {
			//Sunrise
			document.querySelector(".hoverDisplay .fa-sun").id = "";
			document.querySelector(".hoverDisplay .fa-moon").id = "hide";
			//Theme Change
			document.body.style.backgroundColor = "#24c6dc";
			for (let i = 1; i <= 4; i++) {
				document.getElementById(`circle${i}`).style.backgroundColor =
					"#6be4e6";
				document.getElementById(`circle${i}`).style.boxShadow =
					"0px 0px 30px 30px #6be4e6";
			}
			return;
		}
	};
	//----------------------------------------------------------------
	//Function: Initializes the Todo List App//
	const initialiseApp = () => {
		//Click Event Delegation
		document.addEventListener("click", handleClick);
		//KeyPress Event Delegation
		document.addEventListener("keyup", handleKeyPress);
		//To Render the TaskList on the Screen, on every Window Load/Reload
		window.onload = () => {
			const data = getLocalStorage("taskList");
			if (data) renderTaskList();
		};
	};
	//----------------------------------------------------------------
	return {
		initialise: initialiseApp,
	};
})();
//----------------------------------------------------------------
