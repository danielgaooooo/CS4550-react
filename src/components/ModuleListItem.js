import React from 'react';
import {Link} from 'react-router-dom';
import ModuleService from '../services/ModuleService'

export default class ModuleListItem extends React.Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.deleteModule = this.deleteModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.state = {
            editing: false,
            title: ''
        };
        this.confirm = this.confirm.bind(this);
        this.edit = this.edit.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    titleChanged = (event) => {
      this.setState({title: event.target.value})
    };

    confirm = () => {
        this.setState({editing: false})
        this.updateModule();
    };

    edit = () => {
        this.setState({editing: true})
    };

    deleteModule() {
        if (window.confirm('Are you sure you want to delete this module?')) {
            this.moduleService.deleteModule(this.props.module.id)
                .then(this.props.handler);
        }
    }

    updateModule() {
        if (this.state.title === '') {
            window.alert('You must give your module a name.');
        } else {
            this.moduleService.updateModule(this.props.module.id, this.state)
                .then(this.props.handler);
        }
    }

    render() {
        return (
            <li className="list-group-item">
                <div hidden={this.state.editing}>
                    <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                        {this.props.module.title}
                    </Link>
                    <span className="float-right">
                        <button className="btn"
                                style={{paddingRight: 5, paddingLeft: 5}}
                                onClick={this.deleteModule}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <button className="btn"
                                style={{paddingRight: 5, paddingLeft: 5}}
                                onClick={this.edit}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </span>
                </div>
                <div hidden={!this.state.editing}>
                    <input onChange={this.titleChanged}
                           className="form-control"
                           id="titleFld"
                           placeholder={this.props.module.title}/>
                    <button className="btn" onClick={this.confirm}>
                        <i className="fa fa-check"></i>
                    </button>
                </div>
            </li>
        )
    }
}

