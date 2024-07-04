package com.todoapi.todo.todos;

import java.time.LocalDate;

public class Todo {

    private int id;
    private String description;
    private LocalDate targetDate;
    private boolean done;

    private String username;
    public Todo(){}

    public Todo(int id,String username, String description, LocalDate localDate, boolean isDone) {
        super();
        this.id = id;
        this.username=username;
        this.description = description;
        this.targetDate = localDate;
        this.done = isDone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", targetDate=" + targetDate +
                ", done=" + done +
                ", username='" + username + '\'' +
                '}';
    }
}
