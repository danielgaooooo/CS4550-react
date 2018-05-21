import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'
import CourseService from '../services/CourseService';

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        this.moduleService.createModule(this.props.courseId, this.state.module)
            .then(() => this.findAllModulesForCourse(this.props.courseId));
        this.renderListOfModules();
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        var id = this.state.courseId;
        return this.state.modules.map(function (module) {
            return <ModuleListItem courseId = {id} module={module}
                                   key={module.id}/>
        });
    }

    render() {
        return (
            <div>
                <h3>Modules</h3>
                <input onChange={this.titleChanged}
                       value={this.state.module.title}
                       placeholder="New Module"
                       className="form-control"/>
                <button onClick={this.createModule} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        );
    }
}
