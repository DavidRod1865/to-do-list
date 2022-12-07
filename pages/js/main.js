const deleteButton = document.querySelectorAll('.trashCan')
const task = document.querySelectorAll('.taskList span')
const taskCompleted = document.querySelectorAll('.taskList span.completed')

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(task).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(taskCompleted).forEach((element)=>{
    element.addEventListener('click', markIncomplete)
})

// function fetchData(){
//     console.log('Fetch Working')
//     fetch('https://media-mail-api.vercel.app/api/weight/')
//     .then(data => {
//         data.json()
//     })
// }

// fetchData();

async function markComplete() {
    const selectedTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoFromList' : selectedTask
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch(err){
        console.log(err)
    }
}

async function markIncomplete() {
    const selectedTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoFromList' : selectedTask
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch(err){
        console.log(err)
    }
}

async function deleteTask() {
    const selectedTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoFromList' : selectedTask
            })
        }) 
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch(err){
        console.log(err)
    }
}