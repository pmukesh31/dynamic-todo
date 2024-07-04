package com.todoapi.todo.todos;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private static List<Todo> todos=new ArrayList<>();

    private static int todosCount=0;

    static {
        todos.add(new Todo(++todosCount, "mukesh","Get AWS Certified",
                LocalDate.now().plusYears(10), false ));
        todos.add(new Todo(++todosCount, "mukesh","Learn DevOps",
                LocalDate.now().plusYears(11), false ));
        todos.add(new Todo(++todosCount, "mukesh","Learn Full Stack Development",
                LocalDate.now().plusYears(12), false ));
    }

    public List<Todo> findByUsername(String username){

        return todos.stream().filter(
                todo -> todo.getUsername().equalsIgnoreCase(username)
        ).toList();
    }

    public Todo addTodo(String username,String description,LocalDate targetDate,boolean done){
        Todo todo=new Todo(++todosCount,username,description,targetDate,done);

        todos.add(todo);
        return todo;
    }

    public void deleteById(int id){
        todos.removeIf(todo -> todo.getId()==id);
    }
    
    public Todo findById(int id){
        return todos.stream().filter(todo -> todo.getId()==id ).findFirst().get();
    }

    public void updateTodo(Todo todo){
        deleteById(todo.getId());
        todos.add(todo);
    }

}
