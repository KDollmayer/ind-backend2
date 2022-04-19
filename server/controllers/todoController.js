const { Todo } = require('../models/Todo');


const { User } = require("../models/User")

const createTodo = async (req, res) => {
    const { title, body } = req.body.todo;

    const entry = new Todo({
        title,
        body,
        author: req.user.userId,
    });
    await entry.save();


    res.json({
        todo: {
            title: entry.title,
            body: entry.body,
            createdAt: entry.createdAt,
            slug: entry.slug,
            updatedAt: entry.updatedAt,
            author: entry.author,
            done: entry.done
        },
    });
};

const renderTodo = async (req, res) => {
    const author = req.user.userId


    try {
        const todo = await Todo.find({ author: author }).sort('-createdAt').exec()
        res.json({ todo })


    } catch (error) {
        res.json({ message: error })
    }



}
const getTodoBySlug = (async (req, res) => {
    const slug = req.params.slug

    console.log(slug)
    const todo = await Todo.findOne({ slug: slug }).populate('author').exec();
    res.json({ todo });
});

const setDone = (async (req, res) => {
    const slug = req.params.slug

    await Todo.updateOne(
        { slug: slug },
        {
            done: true
        })
    let todo = await Todo
        .find({ slug: slug })
        .populate("author")
        .exec()

    todo = todo[0]
    res.json({ todo });
});

const removeDone = (async (req, res) => {
    console.log("DELETE")
    let slug = req.params.slug;
    await Todo.updateOne(
        { slug: slug },
        {
            done: false
        })
    let todo = await Todo
        .find({ slug: slug })
        .populate("author")
        .exec()

    todo = todo[0]
    res.json({ todo });
});


module.exports = { createTodo, renderTodo, getTodoBySlug, setDone, removeDone }

