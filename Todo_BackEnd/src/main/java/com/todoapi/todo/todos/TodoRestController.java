package com.todoapi.todo.todos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoRestController {

    public TodoService todoService;

    public TodoRestController(TodoService todoService){
        this.todoService=todoService;
    }

    @GetMapping("/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username){
        return todoService.findByUsername(username);
    }
    @DeleteMapping("/{username}/todos/{id}")
    public void getTodos(@PathVariable String username,@PathVariable int id){
        todoService.deleteById(id);
    }

    @GetMapping("/{username}/todo/{id}")
    public Todo getTodo(@PathVariable int id){
        return todoService.findById(id);
    }

    @PutMapping("/{username}/todo/{id}")
    public Todo updateTodo(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo){
        todoService.updateTodo(todo);

        return todo;
    }

    @PostMapping("/{username}/todos")
    public Todo addTodo(@PathVariable String username,@RequestBody Todo todo){
        Todo newTodo=todoService.addTodo(username, todo.getDescription(),todo.getTargetDate(),todo.isDone());

        return newTodo;
    }




}
