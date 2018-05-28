import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
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
                        onClick={this.props.save}>
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
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
});

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default App;