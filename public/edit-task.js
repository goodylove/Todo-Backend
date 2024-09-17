const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
    try {
        const {
            data:{todo}
        } = await axios.get(`/api/v1/todo/${id}`)
        console.log(todo)
        const { _id: taskID, completed, name } = todo

        taskIDDOM.textContent = todo?._id
        taskNameDOM.value = todo?.name
        tempName = todo?.name
        if (completed) {
            taskCompletedDOM.checked = true
        }
    } catch (error) {
        console.log(error)
    }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked

        const {
            data: { 
                updatedtodo
                 },
        } = await axios.patch(`/api/v1/todo/${id}`, {
            name: taskName,
            completed: taskCompleted,
        })

        console.log(
            updatedtodo
            )
        const { _id: taskID, completed, name } = 
        updatedtodo
        

        taskIDDOM.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        if (completed) {
            taskCompletedDOM.checked = true
        }
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited task`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.error(error)
        taskNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})