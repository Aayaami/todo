const express = require('express');
const router = express.Router();
const Todo = require('../models/todo')


// All Todos Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.text != null && req.query.text != '') {
        searchOptions.text = new RegExp(req.query.text, 'i')
    }
    try {
        const todos = await Todo.find(searchOptions)
        res.render('todos/index', {
            todos: todos,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})


// New Author Route
router.get('/new', (req, res) => {
    res.render('todos/new', { todo: new Todo() })
})

router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    try {
        const newTodo = await todo.save()
        //res.redirect(`todos/${newTodo.id}`)
        res.redirect('todos')
    } catch {
        res.render('todos/new', {
            todo: todo,
            errorMessage: 'Error creating Todo'
        })
    }
});

module.exports = router;