import React from 'react';
import ModuleListItem from '../components/ModuleListItem';

export default class ModuleList2 extends React.Component {
    constructor() {
        super();
        this.state = {
            module: {title: ''},
            modules: [
                {title: 'mod 1 - ass eating', id: 1},
                {title: 'mod 2 - butt eating', id: 2},
                {title: 'mod 3 - butt licking', id: 3},
                {title: 'mod 4 - butt munching', id: 4},
                {title: 'mod 5 - ass devouring', id: 5},
                {title: 'final exam', id: 6}
            ]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    createModule(event) {
        console.log(this.state.module);
    }

    renderListOfModules() {
        let modules = this.state.modules.map(
            function (module) {
                return <ModuleListItem title={module.title}/>
            }
        );
        return modules;
    }

    render() {
        return (
            <div>
                <input className="form-control"
                       onChange={this.titleChanged}
                       placeholder="title"/>
                <button
                    onClick={this.createModule}
                    className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <ul className="list-group-item">
                    {this.renderListOfModules()}
                </ul>
            </div>
        );
    }
}