import * as constants from "../constants"

const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState;
    switch (action.type) {
        case constants.PREVIEW:
            newState = Object.assign({}, state);
            newState.preview = !state.preview;
            return newState;

        case constants.TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SELECT_WIDGET_TYPE:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.DELETE_WIDGET:
            if (window.confirm("Are you sure you want to delete this widget?")) {
                return {
                    widgets: state.widgets.filter(widget => (
                        widget.id !== action.id
                    ))
                };
            } else {
                return state;
            }
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        widgetType: 'Heading',
                        size: '1',
                        name: ''
                    }
                ]
            };

        default:
            return state
    }
};

export default widgetReducer;