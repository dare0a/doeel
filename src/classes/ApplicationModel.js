import TodoistInterface from "./TodoistInterface";
import WheelModel from "./WheelModel";

class ApplicationModel {
    _settings=null;
    _todo_backend=null;
    _wheel_model=null;

    constructor() {
        this._settings=null;
    }

    get settings() {
        return this._settings;
    }
    get backend() {
        return this._todo_backend;
    }
    get wheelModel() {
        return this._wheel_model;
    }
    initApplication(settings) {
        this._settings=settings;
        if (settings.todoEngine=='Todoist') {
            this._todo_backend=new TodoistInterface(settings);
        }
        this._wheel_model=new WheelModel(settings);
    }
    loadSettings() {
        if (localStorage.settings) {
            return JSON.parse(localStorage.settings);
        }
        return {};
    }
}

export default ApplicationModel;