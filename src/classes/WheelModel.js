import AxisModel from "./AxisModel";

class WheelModel {
    // _root_project_name=null;
    // _root_project=null;
    
    _default_award=10;

    _projects=null;
    _projects_map=null;

    _axes_options_string='';
    _axes=null;
    // _axes_project_ids=null;
    // _axes=null;

    constructor (obj_settings) {
        this._axis_others=new AxisModel("Others");
        // this._root_project_name=obj_settings.rootProject;
        this._axes_options_string=obj_settings.rootProject;
    }

    get axes() {
        return this._axes;
    }

    get axisOther() {
        return this._axis_others;
    }

    buildProjectsHierarchy(projects) {
        this._projects=projects;

        let projectsMap = new Map();
        //parse projects and build hierarchy
        console.log("seeting axisroot project for ",this._root_project_name);
        for (const project of projects) {
            //set relationships
            projectsMap.set(project.id, project);
            if (projectsMap.has(project.parent_id)) {
                project.parent=projectsMap.get(project.parent_id);
                if (!project.parent.subprojects) {
                    project.parent.subprojects=[];
                }
                project.parent.subprojects.push(project);
            }
            // //find root project for wheel
            // if (!this._root_project) {
            //     if (project.name==this._root_project_name) {
            //         this._root_project=project;
            //     }
            // }
        }
        this._projects_map=projectsMap;
    }

    // propogateAxisDownSubprojects(axis,project) {
    //     if (project.subprojects) {
    //         for (const subproject of project.subprojects) {
    //             subproject.axis=axis;
    //             this.propogateAxisDownSubprojects(axis, subproject);
    //        }
    //     }
    // }
    propogateAxisDownSubprojects(axis,project) {
        // console.debug("down the project",axis.name, axis.project);
        axis.projects.push(project);
        if (project.subprojects) {
            // axis.projects.push.apply(project.subprojects);
            for (const subproject of project.subprojects) {
                this.propogateAxisDownSubprojects(axis, subproject);
            }
        }
    }

    // initAxes() {
    //     if (this._root_project) {
    //         this._axes=[];
    //         this._axes_project_ids=[];
    //         for (const axis_project of this._root_project.subprojects) {
    //             let axis = new AxisModel(axis_project);
    //             axis_project.axis=axis;
    //             this._axes.push(axis);
    //             this._axes_project_ids.push(axis_project.id);
    //             this.propogateAxisDownSubprojects(axis,axis_project);
    //         }
    //         this._axes.push(this._axis_others);
    //     }
    // }

    initAxes() {
        console.debug("initializing axes by ",this._axes_options_string);
        // let ctx=this;
        this._axes=this._axes_options_string.split(',').map(function(axis_name) {
            const project=this._projects.find(el =>{return (el.name==axis_name)});
            return new AxisModel(project);
        },this);
        for (const axis of this._axes) {
            this.propogateAxisDownSubprojects(axis,axis.project);         
        }
        // if (this._root_project) {
        //     this._axes=[];
        //     this._axes_project_ids=[];
        //     for (const axis_project of this._root_project.subprojects) {
        //         let axis = new AxisModel(axis_project);
        //         axis_project.axis=axis;
        //         this._axes.push(axis);
        //         this._axes_project_ids.push(axis_project.id);
        //         this.propogateAxisDownSubprojects(axis,axis_project);
        //     }
        //     this._axes.push(this._axis_others);
        // }
    }


    // return Axe object or null for 'other'
    //classify by project
    classifyTask(task) {
        const task_project=this._projects_map.get(task.project_id);
        // if (task_project.axis) {
        //     return task_project.axis;
        // }
        for (const axis of this._axes) {
            if (axis.includesProject(task_project)) {
                return axis;
            }
        }
        return this._axis_others;
        // if (task.axisProject) {
        //     return task.axisProject;
        // }
        // let path=[];
        // let axis_for_task=null;
        // let uplink=this._projects_map.get(task.project_id);

        // while (-1==axes_project_ids.indexOf(uplink.id)) {
        //     path.push(uplink);
        //     uplink=uplink.parent;
        // }

        // for (const project of path) {
        //     project.axis=axis;
        // }

    } 

}

export default WheelModel;
