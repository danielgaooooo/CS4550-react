import * as constants from "../constants"

export const textChanged = (dispatch, widgetId, newText) => {
        dispatch({
            type: constants.TEXT_CHANGED,
            id: widgetId,
            text: newText
        })
};

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
);

export const nameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        name: newName
    })
);

export const listTypeChanged = (dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newListType
    })
);

export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const save = dispatch => (
    dispatch({type: constants.SAVE})
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);