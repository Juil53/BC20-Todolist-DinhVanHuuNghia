import Task from "./Task.js";
import TaskService from "./TaskService.js";
const taskservice = new TaskService();
const loading = document.getElementById("load");
let isLoading = false;

//Loading
const checkLoading = () => {
  if (isLoading == true) {
    document.getElementsByClassName("card__title")[0].appendChild(loading);
    return;
  }
  document.getElementsByClassName("card__title")[0].removeChild(loading);
};
window.checkLoading = checkLoading;

// RenderData
const renderData = (dataArr) => {
  const todoArr = dataArr.filter((task) => task.status === "todo");
  const completedArr = dataArr.filter((task) => task.status === "completed");
  //Todo
  const todohtml = todoArr?.reduce((contentHTML, task) => {
    return (contentHTML += `
                <li>
                    <span>${task.txtTask}</span>
                    <div class="buttons">
                      <button class="remove" onclick="deleteData(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                      </button>
                      <button class="complete" onclick="updateData(${task.id})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                </li>
                `);
  }, "");
  document.getElementById("todo").innerHTML = todohtml;

  //Completed
  const completedhtml = completedArr?.reduce((contentHTML, task) => {
    return (contentHTML += `
                <li>
                    <span>${task.txtTask}</span>
                    <div class="buttons">
                      <button class="remove" onclick="deleteData(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                      </button>
                      <button class="complete" onclick="updateData(${task.id})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                </li>
                `);
  }, "");
  document.getElementById("completed").innerHTML = completedhtml;
};

//Get Data
const fetchData = () => {
  isLoading = true;
  checkLoading();
  taskservice
    .GetTaskApi()
    .then((result) => {
      isLoading = false;
      checkLoading();
      renderData(result.data);
    })
    .catch((error) => {});
};
fetchData();

//Add Data
const addData = () => {
  const newTask = document.getElementById("newTask").value;
  const task = new Task(newTask, "todo");
  isLoading = true;
  checkLoading();
  taskservice
    .AddTaskApi(task)
    .then((result) => {
      isLoading = false;
      checkLoading();
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
document.getElementById("addItem").onclick = addData;

//Delete Data
const deleteData = (id) => {
  isLoading = true;
  checkLoading();
  taskservice
    .DeleteTaskApi(id)
    .then((result) => {
      isLoading = false;
      checkLoading();
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteData = deleteData;

//Update Data
const updateData = (id) => {
  isLoading = true;
  checkLoading();
  taskservice
    .GetTaskById(id)
    .then((result) => {
      if (result.data.status === "todo") {
        result.data.status = "completed";
      } else if (result.data.status === "completed") {
        result.data.status = "todo";
      }
      taskservice
        .ChangeStatus(result.data)
        .then((result) => {
          isLoading = false;
          checkLoading();
          fetchData();
        })
        .catch((error) => {});
    })
    .catch((error) => {});
};
window.updateData = updateData;
