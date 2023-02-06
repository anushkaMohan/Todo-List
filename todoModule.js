var TodoList=(function(){
    var tasks=[];
    const tasksList = document.getElementById("list");
    const addTaskInput=document.getElementById("add");
    const tasksCounter=document.getElementById("task-counter");
   

    function addTasktoDOM(task){
        const li=document.createElement("li");
        li.innerHTML = `
        
        <input type="checkbox" class="custom-checkbox" id="${task.id}" ${task.done ? "checked" : ''} >
        <label for="${task.id}">${task.text}</label>
        <img src="delete bin.png" class="delete" data-id="${task.id}" >
        
        `;
        tasksList.append(li);
    }


    function renderList(){
        tasksList.textContent="";
        for(let i=0;i<tasks.length;i++)
        {
            addTasktoDOM(tasks[i]);
        }
        tasksCounter.textContent=tasks.length;
    }

    function toggleTask(taskId){
        for(var i=0;i<tasks.length;i++){
            if(tasks[i].id=taskId){
                if(tasks[i]["done"]==false){
                tasks[i]["done"]=true;}
                else{
                    tasks[i]["done"]=false;
                }
                showNotification("Task toggled successfully!");
                renderList();
                return ;
            }
        }
        
        
        
    // showNotification("Something went wrong!");
    }

    function deleteTask(taskId){
        const newTasks=tasks.filter(function(task){
        return task.id!=taskId;})
        tasks=newTasks;
        renderList();
        showNotification("Task deleted successfully!");
    }

    function addTask(task){
        if(task){
        tasks.push(task);
        showNotification("Task added successfully!")
        renderList();
        return;
        }
        showNotification("Task not added!")

    }

    function showNotification(text){
        alert(text);
        
    }

    function handleInputKeyPress(e){
        if(e.key=='Enter')
        {
            const text=e.target.value;
        
        if(!text)
        {
            showNotification("Task cannot be empty!");
            return;
        }
        const task={
            text:text,
            id:Date.now().toString(),
            done : false
        }
        e.target.value= " ";
        addTask(task);
        }
    }
    function handleClickListener(e){
        const target=e.target;
    // console.log(target);
    if(target.className=="delete"){
        const taskId=target.dataset.id;
        console.log(taskId);
            deleteTask(taskId);
    }else if(target.className=="custom-checkbox"){
        const taskId=target.id;
    // console.log(taskId);
            toggleTask(taskId);
    }
    }
 function initialise(){
    addTaskInput.addEventListener('keyup',handleInputKeyPress);
    document.addEventListener("click",handleClickListener);}
    return{
      initial:initialise
    }
})();