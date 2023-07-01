let taskLibrary = [{
    title: "this",
    description: "a bit of detail",
    dueDate: "Jan",
    status: true,
}];

class Task{
    constructor(title, description, dueDate, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
    //allow editing of title
    set newTitle(title) {
        this.title = title
    }
    set newDescription(description) {
        this.description = description
    }
    set newDueDate(dueDate) {
        this.dueDate = dueDate
    }
    set newStatus(status) {
        this.status = status
    }
}

//get elements of form input
const taskForm = document.querySelector(".task-form")
const titleInput = document.querySelector("#title-input")
const descriptionInput = document.querySelector("#description-input")
const dueInput = document.querySelector("#due-input")
const statusInput = document.querySelector("#status-input")
const submit = document.querySelector("#submit-button")
const closeButton = document.querySelector("#close-button")
const taskContainer = document.querySelector(".container")


const addTask = () => {
    let title = titleInput.value;
    let description = descriptionInput.value;
    let dueDate = new Date(dueInput.value).toDateString();    
    let status = statusInput.checked;
    let newTask = new Task(title, description, dueDate, status);
    
    taskLibrary.push(newTask)
    
    

    displayTasks()
}


const displayTasks = () => {
    taskContainer.textContent = "";

    //declare index variables for tasks in taskLibrary
    let index;
    let status;

    taskLibrary.forEach((task, i) => {
        index = i; 
        status = ""

        let card = document.createElement("div")
        card.classList.add("taskCard")

        //title
        let titleSpan = document.createElement("span");
        titleSpan.textContent = `Task title: ${task.title}`
        card.appendChild(titleSpan)

        //description
        let descriptionSpan = document.createElement("span");
        descriptionSpan.textContent = `Description: ${task.description}`;
        card.appendChild(descriptionSpan)

        //due date
        let dueSpan = document.createElement("span");
        dueSpan.textContent = `Due date: ${task.dueDate} `;
        card.appendChild(dueSpan)

        //status checkbox
        let statusCheckbox = document.createElement("input");
        statusCheckbox.classList.add("task-status")
        statusCheckbox.setAttribute("type", "checkbox")
        statusCheckbox.setAttribute("data-status", task.status);
        statusCheckbox.setAttribute("data-index", i);
        card.appendChild(statusCheckbox)

        //edit button
        let editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.classList.add("edit-button")
        card.appendChild(editButton)


        //status check logic
        if (task.status === true) {
            titleSpan.setAttribute("style", "text-decoration: line-through" )
            statusCheckbox.checked = true
            card.setAttribute("style", "border-left: 4px solid green")
            
        }
        else if (task.status === false) {
            card.setAttribute("style", "border-left: 4px solid red")
            
        }

        taskContainer.appendChild(card)


        /* Update the tasks status */

    taskContainer.addEventListener("click", e => {
        if (e.target.classList.contains("task-status")) {
            const status = e.target.getAttribute("data-status");
            const index = e.target.getAttribute("data-index")
            
            
            if (status == "true") {
                taskLibrary[index].status = false;
                titleSpan.setAttribute("style", "text-decoration: none" );
                e.target.setAttribute("data-status", false);
                e.target.setAttribute("style", "background-color: lightcoral");
                const thisCard = e.target.closest(".taskCard");
                thisCard.setAttribute("style", "border-left: 4px solid red");
                               
            }
            else if (status == "false") {
                
                taskLibrary[index].read = true;
                titleSpan.setAttribute("style", "text-decoration: line-through" );
                e.target.setAttribute("data-status", true)
                e.target.setAttribute("style", "background-color: green")
                const thisCard = e.target.closest(".taskCard")
                thisCard.setAttribute("style", "border-left: 4px solid green")                
            }
        }
    })
    

//edit function

editButton.addEventListener("click", e => {
    console.log(e.target)})
    //trigger an edit function
    })

}






export {Task, addTask, taskLibrary}