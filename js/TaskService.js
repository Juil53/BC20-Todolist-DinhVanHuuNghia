class TaskService {
  //GET
  GetTaskApi() {
    return axios({
      url: "https://618eab9a50e24d0017ce13c9.mockapi.io/dataToDo",
      method: "GET",
    });
  }

  //Add
  AddTaskApi(task) {
    return axios({
      url: "https://618eab9a50e24d0017ce13c9.mockapi.io/dataToDo",
      method: "POST",
      data: task,
    });
  }

  //Delete
  DeleteTaskApi(id) {
    return axios({
      url: `https://618eab9a50e24d0017ce13c9.mockapi.io/dataToDo/${id}`,
      method: "DELETE",
    });
  }

  //GetList
  GetTaskById(id){
      return axios({
          url: `https://618eab9a50e24d0017ce13c9.mockapi.io/dataToDo/${id}`,
          method: "GET",
      })
  }

  //Update
  ChangeStatus(task) {
    return axios({
      url: `https://618eab9a50e24d0017ce13c9.mockapi.io/dataToDo/${task.id}`,
      method: "PUT",
      data: task,
    });
  }
}
export default TaskService;
