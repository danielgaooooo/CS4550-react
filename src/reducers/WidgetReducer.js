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

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType;
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget)
                })
            };
        case constants.MOVE_UP:
            let swapUp;
            let unsortedUps = state.widgets.map(widget => {
                if (widget.id === action.id) {
                    widget.precedence -= 1;
                    swapUp = widget.precedence;
                }
                return Object.assign({}, widget);
            });
            let unsortedUpsMedian = unsortedUps.map(widget => {
                if (widget.precedence === swapUp && widget.id !== action.id) {
                    widget.precedence += 1;
                }
                return Object.assign({}, widget);
            });
            let sortedUps = unsortedUpsMedian.sort((a, b) => a.precedence - b.precedence);
            return {
                widgets: sortedUps
            };

        case constants.MOVE_DOWN:
            let swapDown;
            let unsortedDowns = state.widgets.map(widget => {
                if (widget.id === action.id) {
                    widget.precedence += 1;
                    swapDown = widget.precedence;
                }
                return Object.assign({}, widget);
            });
            let unsortedDownsMedian = unsortedDowns.map(widget => {
               if (widget.precedence === swapDown && widget.id !== action.id) {
                   widget.precedence -= 1;
               }
               return Object.assign({}, widget);
            });
            let sortedDowns = unsortedDownsMedian.sort((a, b) => a.precedence - b.precedence);
            return {
                widgets: sortedDowns
            };

        case constants.URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href;
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
            fetch('https://cs4550-hw1.herokuapp.com/api/lesson/' + action.lessonId + '/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(() => window.alert('Save successful'));
            return state;

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            action.widgets.sort((a, b) => a.precedence - b.precedence);
            action.widgets.map(widget => widget.maxPrecedence = action.widgets.length);
            newState.widgets = action.widgets;
            return newState;

        case constants.DELETE_WIDGET:
            if (window.confirm("Are you sure you want to delete this widget?")) {

                let swap;
                // gets the position of the deleted element
                state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        swap = widget.precedence;
                    }
                });
                // deletes the element
                let newWidgets = state.widgets.filter(widget => (
                    widget.id !== action.id
                ));
                // updates the size of the list
                newWidgets.map(widget => (
                    widget.maxPrecedence = newWidgets.length
                ));
                // updates precedence of all items after the deleted item
                newWidgets.map(widget => {
                    if (widget.precedence >= swap) {
                        widget.precedence -= 1;
                    }
                });
                return {
                    widgets: newWidgets.map(widget => (
                        Object.assign({}, widget)
                    ))
                }
            } else {
                return state;
            }

        case constants.ADD_WIDGET: {
            let newWidgetId = state.widgets.length + 1;
            let newWidgets = [
                ...state.widgets,
                {
                    id: newWidgetId,
                    text: '',
                    widgetType: 'Heading',
                    size: '1',
                    name: '',
                    listType: 'Ordered',
                    src: '',
                    href: '',
                    precedence: '-1',
                    maxPrecedence: '-1'
                }
            ];
            // updates the length of the list
            newWidgets.map(widget => {
                widget.maxPrecedence = newWidgets.length;
            });
            // sets the new widget's precedence to the max precedence
            newWidgets.map(widget => {
                if (widget.id === newWidgetId) {
                    widget.precedence = widget.maxPrecedence;
                }
            });
            return {widgets: newWidgets.map(widget => (
                Object.assign({}, widget)
                ))};
        }
        default:
            return state;
    }
};

export default widgetReducer;