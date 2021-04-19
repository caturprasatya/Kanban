const {User, Task} = require('../models')

class TaskController {
    static fetchTask(req, res, next){
        // let {id} = req.currentUser
        Task
            .findAll({include : User})
            .then(tasks =>{
                
                res.status(200).json(tasks)
            })
            .catch(err =>{
                next({
                    code : 500,
                    message : 'Internal server error'
                })
            })
    }

    static addTask(req, res, next){
        let { id } = req.params
        let { title, category } = req.body
        let userId = req.currentUser.id
        let newTask = { title, category, userId }

        Task
            .create(newTask)
            .then(task =>{

                res.status(201).json({task})
            })
            .catch(err=>{
                if (Array.isArray(err.errors)) {
                    next({
                        code : 400,
                        message : err.errors
                    })
                } else {
                    next({
                        code : 500,
                        message : 'Internal server error'
                    })
                }
            })
    }

    static editTask(req, res, next){
        let { id } = req.params
        let { title, category } = req.body
        let newTask = { title, category, }

        Task
            .update(newTask, {where : { id }})
            .then(data =>{
                res.status(200).json({data})
            })
            .catch(err=>{
                if (Array.isArray(err.errors)) {
                    next({
                        code : 400,
                        message : err.errors
                    })
                } else {
                    next({
                        code : 500,
                        message : 'Inertnal server error'
                    })
                }
            })
    }

    static changeRole(req, res, next){
        let {category} = req.body
        let {id} = req.params
        let update = {category}
        Task 
            .update(update, {where : { id }})
            .then(task =>{
                res.status(200).json({task})
            })
            .catch(err =>{
                console.log(err);
                next({
                    code : 500,
                    message : 'Internal server error'
                })
            })
    }

    static deleteTask(req, res, next){
        let { id } = req.params
        
        Task
        .destroy({where : {id}, returning : true})
        .then(data =>{
                console.log('ini jalan d destroy');
                res.status(200).json({data})
            })
            .catch(err =>{
                console.log(err);
                next({
                    code : 500,
                    message : 'Internal server error di destroyy'
                })
            })
    }
}

module.exports = TaskController