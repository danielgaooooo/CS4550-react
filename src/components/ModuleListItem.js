import React from 'react';
import {Link} from 'react-router-dom';
import ModuleService from '../services/ModuleService'

export default class ModuleListItem extends React.Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.deleteModule = this.deleteModule.bind(this);
    }

    deleteModule() {
        this.moduleService.deleteModule(this.props.module.id)
            .then(this.props.handler);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
                <span className="float-right">
                    <button onClick={this.deleteModule}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <button>
                        <i className="fa fa-pencil"></i>
                    </button>
                </span>
            </li>
        )
    }
}
