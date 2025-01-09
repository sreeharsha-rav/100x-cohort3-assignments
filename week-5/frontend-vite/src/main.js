import "./style.css";
import { setupTodoApp } from "./todo";

// DOM elements
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

setupTodoApp(todoInput, addButton, todoList);
