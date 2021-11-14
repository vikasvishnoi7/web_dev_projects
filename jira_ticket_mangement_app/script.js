var uid = new ShortUniqueId();
// variables 
let colors = ["pink", "blue", "green", "black"];
let defaultColor = "black";
let cFilter = "";
let deleteMode = false;
let pColor = "";
let modaldisplay = false;
// elements 
let input = document.querySelector(".input_container_text");
let mainContainer = document.querySelector(".main-container");
let colorContainer = document.querySelector(".color-group_container");
let lockContainer = document.querySelector(".lock-container");
let unlockContainer = document.querySelector(".unlock-container");
let deleteContainer = document.querySelector(".multiply-container");
let plusContainer = document.querySelector(".puls-container");
let colorBoxes = document.querySelectorAll(".colorBox");
let colorBtn = document.querySelectorAll(".color");
let colorChooser = document.querySelector(".color_container")
let modal = document.querySelector(".modal")
// event Listeners
input.addEventListener("keydown", function (e){
    if(e.code == "Enter" && input.value){
        //when are you clicking enter -> remove active class from plusContainer
        //and set modaldisplay -> false
        modaldisplay = false;
        plusContainer.classList.remove("active");

        // console.log("task_value", input.value);
        let id = uid();
        createTask(id, input.value, true);
        input.value = "";
        modal.style.display = "none";
    }
})

// filtering 
//use element colorBtn, colorBoxes
for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", function (){
        // <div class="color pink"></div>  ->  here classList[1] means pink, blue,green,black
        let filterCardColor = colorBtn[i].classList[1];
        // console.log(filterCardColor);
        filterCards(filterCardColor);
    })
    
}
//add "active" class -> in class "colorBox"
for (let i = 0; i < colorBtn.length; i++){
    colorBtn[i].addEventListener("click", function () {
        for (let i = 0; i < colorBtn.length; i++){
            colorBoxes[i].classList.remove("active");
        }
        let currColor = colorBtn[i].classList[1];
        if(pColor != currColor){
            colorBoxes[i].classList.add("active");
            pColor = currColor;
        }else{
            pColor = "";
        }
    })
}

//modal -> colorChooser 
let AllColorElements = document.querySelectorAll(".color_picker");
colorChooser.addEventListener("click", function (e) {
    let element = e.target;
    console.log("e.target", element);
    if (element != colorChooser) {
        let filteredCardColor = element.classList[1];
        defaultColor = filteredCardColor;
        for(let i = 0; i < AllColorElements.length; i++){
            AllColorElements[i].classList.remove("selected")
        }
        element.classList.add("selected")
    }
})

// colorContainer.addEventListener("click", function (e) {
//     let element = e.target;
//     console.log("e.target", element);
//     if (element !=  colorContainer) {
//         let filteredCardColor = element.classList[1];
//         filterCards(filteredCardColor);
//     }
// })


//event Listener on lockContainer
lockContainer.addEventListener("click", function (){
   let numberOFElements = document.querySelectorAll(".task_main-container>div");
   for(let i = 0; i < numberOFElements.length; i++){
    //    <div class="text" contentEditable="true">${task}</div>
       numberOFElements[i].contentEditable = false;
   }

   lockContainer.classList.add("active");
   unlockContainer.classList.remove("active");
})

//event Listener on unlockContainer
unlockContainer.addEventListener("click", function () {
    let numberOFElements = document.querySelectorAll(".task_main-container>div");
    for(let i = 0; i < numberOFElements.length; i++){
        numberOFElements[i].contentEditable = true;
    }

    unlockContainer.classList.add("active");
    lockContainer.classList.remove("active");
})

// event Listener on deleteContainer
deleteContainer.addEventListener("click", function (){
    //deletMode false to true
    deleteMode =! deleteMode;
    if(deleteMode){
        deleteContainer.classList.add("active");
    }else{
        deleteContainer.classList.remove("active");
    }

})
//for modal visible
plusContainer.addEventListener("click", function (e) {
    modaldisplay =! modaldisplay;
    if (modaldisplay){
        plusContainer.classList.add("active");
        modal.style.display = "flex";
    }else{
        plusContainer.classList.remove("active");
        modal.style.display = "none";
    }
})

// helpers
function createTask (id, task, flag, color) {
    // ticket create
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "task_container");
    mainContainer.appendChild(taskContainer);
    taskContainer.innerHTML = `
            <div class="task_header ${color ? color : defaultColor}"></div>
            <div class="task_main-container">
                <h3 class="task_id">#${id}</h3>
                <div class="text" spellcheck="false" contentEditable="true">${task}</div>
            </div>`;
    
    let nextColor;
     // addEventListener for color changes
    let taskHeader = taskContainer.querySelector(".task_header");
    // ***********************color change****************************************
    taskHeader.addEventListener("click", function () {
        let cColor = taskHeader.classList[1];
        let idx = colors.indexOf(cColor);
        let nextIdx = (idx + 1) % 4;
        nextColor = colors[nextIdx];
        taskHeader.classList.remove(cColor);
        taskHeader.classList.add(nextColor);


         //  id -> localstorage search -> tell -> color update 
        // console.log("parent", taskHeader.parentNode); --> task_container
        // console.log("taskcontainer", taskHeader.parentNode.children[1]); --> task_main-container

        // **************************change color store in localStorage*********************
        let idWalaElem = taskHeader.parentNode.children[1].children[0];
        let id = idWalaElem.textContent;
        console.log(id);
        id = id.split("#")[1];

        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString);

        for(let i = 0; i < tasksArr.length; i++){
            if(tasksArr[i].id == id){
                tasksArr[i].color = nextColor;
                break;
            }
        }

        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    })   
    
    // *************************delete********************** 

    taskContainer.addEventListener("click", function (){
        if (deleteMode == true) {// delete ->ui , storage
            // local storage -> remove;
            let tasksString = localStorage.getItem("tasks");
            let tasksArr = JSON.parse(tasksString);

            for(let i = 0; i< tasksArr.length; i++){
                if(tasksArr[i].id == id){
                     // The splice() method adds and / or removes array elements.
                    // first Argument -> index
                    // Second Argument -> Number of items to be removed.

                    tasksArr.splice(i, 1);
                    localStorage.setItem("tasks", JSON.stringify(tasksArr))
                    // delete -> UI
                    taskContainer.remove();
                    break;
                }
            }

        }
    })

    // ****************************Textcontent update in localStorage**************************
    let inputTask = taskContainer.querySelector(".task_main-container>div")

    inputTask.addEventListener("blur", function () {
        let content = inputTask.textContent;
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString);

        // {id: "nDCn8Q", task: "ffdsjbdshf", color: "pink} , {}
        for (let i = 0; i < tasksArr.length; i++) {
            if(tasksArr[i].id == id){
                tasksArr[i].task = content;
                break;
            }
        }

        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    })

    // LocalStorage 
    if(flag == true){
        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString) || [];
        let taskObject = {
            id: id,
            task: task,
            color: defaultColor
        }
        tasksArr.push(taskObject);
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }
    
}

//color filter function
function filterCards (filterColor) {
    let allTaskCards = document.querySelectorAll(".task_container");
    if (cFilter != filterColor) {
        for (let i = 0; i < allTaskCards.length; i++) {
            // header color -> 
            let taskHeader = allTaskCards[i].querySelector(".task_header");
            let taskColor = taskHeader.classList[1];
            if (taskColor == filterColor) {
                // show 
                allTaskCards[i].style.display = "block"
            } else {
                // hide 
                allTaskCards[i].style.display = "none"
            }
        }
        cFilter = filterColor;
    } else {
        cFilter = "";
        for (let i = 0; i < allTaskCards.length; i++) {
            allTaskCards[i].style.display = "block"
        }
    }
    
}


(function (){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasks.length; i++){
        let { id, task, color } = tasks[i];
        createTask(id, task, false, color);
    }

    modal.style.display = "none";
})()

/**
 * <div class="task_container">
            <div class="task_header"></div>
            <div class="task_main-container">
                <h3 class="task_id">#uhriu</h3>
                <div class="text">this is my first task</div>
            </div>
        </div>
 */