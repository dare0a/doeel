import AbstractBackendInterface from "./AbstractBackendInterface";
// import TaskModel from "./TaskModel";

// const url_completed_tasks_url = "https://api.todoist.com/sync/v8/completed/get_all";
// const url_get_all_projects =  "https://api.todoist.com/rest/v1/projects";
const mock_url_get_all_projects =  "http://localhost:8080/all_projects.mock.json";
const mock_url_completed_tasks_url='http://localhost:8080/completed_tasks.mock.json';



class TodoistInterface extends AbstractBackendInterface {
    _api_token='';
    _scoring_regexp='';
    _root_project_name=null;
    _root_project=null;
    _default_award=10;

    _cached_projects=[];                

    constructor (obj_settings) {
        super();
        this._api_token=obj_settings.todoistAPItoken;
        this._scoring_regexp=obj_settings.scoreingRegexp;
        this._root_project_name=obj_settings.rootProject;
    }

    get api_token() {
        return this._api_token;
    }

    scoreTask(task) {
        try {
            return parseInt(task.content.match(this._scoring_regexp)[1]);
        } catch(e) {
            return this._default_award;
        }
    }

    buildProjectModel(backend_obj) {
        // let prj = new ProjectModel();
        let prj = {};
        prj.id=parseInt(backend_obj.id);
        prj.name=backend_obj.name;
        prj.parent_id=parseInt(backend_obj.parent_id);
        return prj;
    }

    // // creates Doeel task object based on   
    buildTaskModel(obj_backend_task) {
        // let task= new TaskModel();
        let task = {};
        task.score=this.scoreTask(obj_backend_task);
        task.id=obj_backend_task.task_id;
        task.project_id=obj_backend_task.project_id;
        task.content=obj_backend_task.content;
        task.date=Date.parse(obj_backend_task.completed_date.split('T')[0]);
        return task;
    }

    // // // loads all completed tasks
    // loadCompletedTasks(vue_context, period) {
    //     this._a=period
    //     return vue_context.$http.get( mock_url_completed_tasks_url, {
    //         "token" :this._api_token
    //     });
    // // this.$http
    // //   .get(url, {
    // //     "token" : '6ae7e380b233f008df02043beac83f47898cb791',
    // //     })
    // //   // .post(url, {
    // //   //   "token" : '6ae7e380b233f008df02043beac83f47898cb791',
    // //   //   })
    // }
    loadCompletedTasks(vue_context, period, f_callback) {
        this._a=period
        let context=this;

        return vue_context.$http.get( mock_url_completed_tasks_url, {
            "token" :this._api_token
        }).then(function(response) {
            console.log("tasks loaded");
            
            // remap tasks from responce array
            let task_ids  =new Set();
            let tasks=response.data.items.map (function(item) {
                let task=context.buildTaskModel(item);
                if (task_ids.has(task.id)) {
                    task.id=item.task_id+'1';
                }
                task_ids.add(task.id);
                return task;
            });
            f_callback(tasks);
        });
    }

    // // loads projects
    loadProjects(vue_context, f_callback) {
        let context=this;
        return vue_context.$http.get(  mock_url_get_all_projects, {
                headers: {
                    Authorization: 'Bearer ' + this._api_token
                  }
            }).then(function(response) {
                console.log('projects loaded');
                context._cached_projects=response.data;            

                // //parse projects and build hierarchy
                // let projectsMap = new Map(); 
                // let projects=response.data.map(function(item) {
                //     //ingest and convert to model
                //     let project=context.buildProjectModel(item);

                //     //set relationships
                //     projectsMap.set(project.id,project);
                //     if (projectsMap.has(project.parent_id)) {
                //         project.parent=projectsMap.get(project.parent_id);
                //         project.parent.subprojects=[project];
                //     }

                //     //find root project for wheel
                //     if (!context._root_project) {
                //         if (project.name==context._root_project_name) {
                //             context._root_project=project;
                //         }
                //     }

                //     return project;
                //parse projects
                let projects=response.data.map(function(item) {
                    //convert to project model
                    let project=context.buildProjectModel(item);
                    return project;
                });
                    
                f_callback(projects);
            });
    }
}

export default TodoistInterface;
