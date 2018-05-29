import * as constants from "../constants"
import {DELETE_WIDGET} from "../constants";

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

export const srcChanged = (dispatch, widgetId, newSrc) => (
    dispatch({
        type: constants.SRC_CHANGED,
        id: widgetId,
        src: newSrc
    })
);

export const urlChanged = (dispatch, widgetId, newHref) => (
    dispatch({
        type: constants.URL_CHANGED,
        id: widgetId,
        href: newHref
    })
);


export const moveUp = (dispatch, widgetId) => (
    dispatch({
        type: constants.MOVE_UP,
        id: widgetId
    })
);

export const moveDown = (dispatch, widgetId) => (
    dispatch({
        type: constants.MOVE_DOWN,
        id: widgetId
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

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    fetch('http://localhost:8080/api/lesson/' + lessonId + '/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const save = (dispatch, lessonId) => (
    dispatch({
        type: constants.SAVE,
        lessonId: lessonId
    })
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);

export const deleteWidget = (dispatch, widgetId) => {
    dispatch({type: constants.DELETE_WIDGET, id: widgetId})
};

export const selectWidget = (dispatch, widgetId, widgetType) => {
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: widgetType
    })
};