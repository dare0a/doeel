class AbstractBackendInterface {
    constructor() {
        if (this.constructor == AbstractBackendInterface) {
          throw new Error("Abstract classes can't be instantiated.");
        }
    }
    // buildProjectModel(obj_backend_project) {

    // }

    // // creates Doeel task object based on   
    // buildTaskModel(obj_backend_task) {
    // }

    // // loads all completed tasks
    // loadCompleedTasks(period) {

    // }

    // // loads projects
    loadProjects() {

    }
}

export default AbstractBackendInterface;
