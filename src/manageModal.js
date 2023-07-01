import { addTask } from "./manageTasks";

const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector("#close-button");
const modal = document.querySelector(".modal")
const submit = document.querySelector("#submit-button")

const openIt = openModal.addEventListener("click", (e) => {
    modal.showModal()
})

const closeIt = closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close()
})


const closeClick = modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })

const submitIt = submit.addEventListener("click", e => {
    e.preventDefault();
    addTask();
    modal.close()
    
})

export {openIt, closeIt, closeClick, submitIt}