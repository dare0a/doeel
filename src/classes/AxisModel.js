class AxisModel {
    _is_project_axis=true;
    _axis_name='';
    _axis_project=null;
    _axis_projects=[];

    _construct_by_string(name) {
        this._is_project_axis=false;
        this._axis_name=name;
    }
    _construct_by_project(project) {
        this._is_project_axis=true;
        this._axis_project=project;
        this._axis_name=project.name;
        // console.debug("axis constructor by project",this._axis_name,this._axis_project);
    }
    constructor(obj) {
        if (typeof(obj)=='string') {
            this._construct_by_string (obj);
        } else {
            this._construct_by_project (obj);
        }
    }

    get name() {
        return this._axis_name;
    }
    set name(name) {
        this._axis_name=name;
    }

    get project() {
        return this._axis_project;
    }

    get projects() {
        return this._axis_projects;
    }

    // set axisProject(project) {
    //     this._axix_project=project;
    // }

    includesProject(project) {
        return -1!=this._axis_projects.findIndex(el=>{return el.id==project.id});
    }
}

export default AxisModel;