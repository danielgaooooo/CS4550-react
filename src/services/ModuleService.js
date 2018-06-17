const MODULE_API_URL =
    'https://cs4550-springboot.herokuapp.com/api/course/CID/module';
const MODULE_API_URL_SHORT =
    'https://cs4550-springboot.herokuapp.com/api/module';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId), {
            body: JSON.stringify(module),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL_SHORT + '/' + moduleId, {
            method: 'delete'
        })
    }

    findAllModules() {
        return fetch(MODULE_API_URL_SHORT)
            .then(function (response) {
                return response.json();
            });
    }

    findModuleById(moduleId) {
        return fetch(MODULE_API_URL_SHORT + '/' + moduleId)
            .then(function (response) {
                return response.json();
            })
    }


    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL.replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    updateModule(moduleId, module) {
        return fetch(MODULE_API_URL_SHORT + '/' + moduleId, {
            method: 'put',
            body: JSON.stringify(module),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }
}