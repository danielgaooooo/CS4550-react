import React from 'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants"
import * as actions from '../actions'


const stateToPropsMapper = state => ({
    preview: state.preview
});

const dispatchToPropsMapper = dispatch => ({
    textChanged: (widgetId, newText) =>
        actions.textChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        actions.headingSizeChanged(dispatch, widgetId, newSize),
    nameChanged: (widgetId, newName) =>
        actions.nameChanged(dispatch, widgetId, newName),
    listTypeChanged: (widgetId, newListType) =>
        actions.listTypeChanged(dispatch, widgetId, newListType)
});

// HEADING STUFF ==================================================================================
const Heading = ({widget, preview, textChanged, headingSizeChanged, nameChanged}) => {
    let selectElem;
    let inputElem;
    let nameElem;
    return (
        <div>
            <div hidden={preview}>
                <h4>Heading Widget</h4>
                <input onChange={() => nameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       className="form-control"
                       placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <input onChange={() => textChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       className="form-control"
                       placeholder="Heading text"
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        className="form-control"
                        ref={node => selectElem = node}>
                    <option value="1">Heading size 1</option>
                    <option value="2">Heading size 2</option>
                    <option value="3">Heading size 3</option>
                </select>
                <h5 style={{paddingTop: 10}}>Preview</h5>
            </div>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
};

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);


// PARAGRAPH STUFF ================================================================================
const Paragraph = ({preview, widget, textChanged, nameChanged}) => {
    let inputElem;
    let nameElem;
    return (
        <div>
            <div hidden={preview}>
                <h4>Paragraph Widget</h4>
                <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                          value={widget.text}
                          className="form-control"
                          placeholder="Paragraph text"
                          ref={node => inputElem = node}/>
                <input onChange={() => nameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       className="form-control"
                       placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <h5 style={{paddingTop: 10}}>Preview</h5>
            </div>
            {widget.text}
        </div>
    );
};

const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);

// LIST STUFF =====================================================================================
const List = ({preview, widget, textChanged, nameChanged, listTypeChanged}) => {
    let inputElem;
    let nameElem;
    let orderedElem;
    let temp = "Enter one \n list item \n per row";
    return (
        <div>
            <div hidden={preview}>
                <h4>List Widget</h4>
                <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                          value={widget.text}
                          className="form-control"
                          placeholder={temp}
                          ref={node => inputElem = node}/>
                <input onChange={() => nameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       className="form-control"
                       placeholder="Widget name"
                       ref={node => nameElem = node}/>
                <select onChange={() => listTypeChanged(widget.id, orderedElem.value)}
                        value={widget.listType}
                        className="form-control"
                        ref={node => orderedElem = node}>
                    <option value="Ordered">Ordered</option>
                    <option value="Unordered">Unordered</option>
                </select>
                <h5 style={{paddingTop: 10}}>Preview</h5>
            </div>
            <ul hidden={widget.listType !== 'Unordered' || widget.text.split("\n") <= 1}>
                {widget.text.split("\n").map(item => ( <li key={item}>{item}</li>))}
            </ul>
            <ol hidden={widget.listType !== 'Ordered' || widget.text.split("\n") <= 1}>
                {widget.text.split("\n").map(item => ( <li key={item}>{item}</li>))}
            </ol>
        </div>
    )
};

const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);

// IMAGE STUFF ====================================================================================
const Image = () => (
    <h4>Image Widget</h4>
);

const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);

// LINK STUFF =====================================================================================
const Link = () => (
    <h4>Link Widget</h4>
);

const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);

// WIDGET STUFF ===================================================================================
const Widget = ({widget, preview, dispatch}) => {
    let selectElement;
    return (
        <li className="list-group-item">
            <div hidden={preview}>
                <button className="btn float-right"
                        title="Delete"
                        onClick={e => (
                            dispatch({type: DELETE_WIDGET, id: widget.id})
                        )}>
                    <i className="fa fa-trash"></i>
                </button>
                <div className="float-right" style={{paddingTop: 5}}>
                    <select
                        value={widget.widgetType}
                        onChange={e =>
                            dispatch({
                                type: 'SELECT_WIDGET_TYPE',
                                id: widget.id,
                                widgetType: selectElement.value
                            })} ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Paragraph</option>
                        <option>List</option>
                        <option>Image</option>
                        <option>Link</option>
                    </select>
                </div>
                <button className="btn float-right"
                        title="Move down">
                    <i className="fa fa-arrow-down"></i>
                </button>
                <button className="btn float-right"
                        title="Move up">
                    <i className="fa fa-arrow-up"></i>
                </button>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )
};

const WidgetContainer = connect(stateToPropsMapper)(Widget);

export default WidgetContainer;
