let _singleton = Symbol();
const LESSON_API_URL = 'https://cs4550-springboot.herokuapp.com/api/lesson';
const LONG_LESSON_API_URL = 'https://cs4550-springboot.herokuapp.com/api/course/CID/module/MID/lesson';

class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(LONG_LESSON_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId), {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        });
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId, {
            method: 'delete'
        })
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    findLessonById(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId)
            .then(function (response) {
                return response.json();
            })
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(LONG_LESSON_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            });
    }

    updateLesson(lessonId, lesson) {
        return fetch(LESSON_API_URL + '/' + lessonId, {
            method: 'put',
            body: JSON.stringify(lesson),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }
}

export default LessonService;