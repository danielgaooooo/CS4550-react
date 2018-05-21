let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080/api/lesson';
const LONG_LESSON_API_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson';

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

    createLesson(courseId, lesson) {
        return fetch(LONG_LESSON_API_URL
            .replace('CID', courseId)
            .replace('MID', lesson.module.id), {
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

    findAllLessonsForModule(module) {
        return fetch(LONG_LESSON_API_URL
            .replace('CID', module.course.id)
            .replace('MID', module.id))
            .then(function (response) {
                return response.json();
            });
    }

    updateLesson(lessonId, lesson) {

    }
}

export default LessonService;