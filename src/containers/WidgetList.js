import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: ''
        };
    }

    componentDidMount() {
        this.setState({lessonId: this.props.match.params.lessonId},
            () => this.props.findAllWidgets(this.state.lessonId));
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.lessonId !== this.state.lessonId) {
            this.setState({lessonId: newProps.match.params.lessonId},
                () => this.props.findAllWidgets(this.state.lessonId));
        }
    }

    render() {
        let lessonId = this.state.lessonId;
        return (
            <div>
                <ul style={{paddingLeft: 0}}>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button className="btn float-right"
                        title="Add new widget"
                        onClick={this.props.addWidget}>
                    <i className="fa fa-plus"></i>
                </button>
                <button className="btn float-right"
                        title="Save"
                        onClick={() => this.props.save(lessonId)}>
                    <i className="fa fa-save"></i>
                </button>
                <button className="btn float-right"
                        title="Preview"
                        hidden={this.props.previewMode}
                        onClick={this.props.preview}>
                    <i className="fa fa-eye"></i>
                </button>
                <button className="btn float-right"
                        title="Edit"
                        hidden={!this.props.previewMode}
                        onClick={this.props.preview}>
                    <i className="fa fa-pencil"></i>
                </button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
});

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch, lessonId),
    preview: () => actions.preview(dispatch)
});

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList);

export default App;