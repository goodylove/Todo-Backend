const Todo = require('../models/todo');
const asyncWrapper = require("../middleware/async")



const getAllTodos = asyncWrapper(async(req, res) => {
    const todo = await Todo.find({})
    res.status(200).json({todo });
        
  

   

})


 const getTodoById = asyncWrapper(async(req, res,next) => {
     
        const {id:todoId} = req.params
        const todo =   await Todo.findById({_id:todoId})

        if(!todo) {
            return next(customErrorHandler(`No todo with id :${todoId}`, 404))
        }

        res.status(200).json({ success: true,  todo });

   
    
})


 const createTodo = asyncWrapper(async(req, res,next) => {
   
    const todo = await Todo.create(req.body)
    res.status(201).json({ success: true, message: {todo} });
  

})


 const deleteTodo = asyncWrapper(async(req, res,next) => {
        const {id:todoId} = req.params
        const todo = await Todo.findByIdAndDelete({_id:todoId})

        if(!todo) {
            return next(customErrorHandler(`No todo with id :${todoId}`, 404))  // Todo not found error code 404
        }
        
        res.status(200).json({ success: true, message: `Todo with id ${req.params.id} deleted successfully` });
   
})



 const updateTodo = asyncWrapper(async(req, res,next) => {
    
        const {id:todoId} = req.params

        const updatedtodo =  await Todo.findByIdAndUpdate({_id:todoId},req.body,{
            new: true,
            runValidators: true,
        })
        if(!updatedtodo) {
            return next(customErrorHandler(`No todo with id :${todoId}`, 404))
        }
        res.status(200).json({ success: true,  updatedtodo });
   
})


module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo}