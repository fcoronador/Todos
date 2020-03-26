import './style.css';
//import img from './assets/imagen.jpg';
import {Todo,TodoList } from './classes';
import { creaTodoHtml } from './js/componentes';

export const todoLista= new TodoList();

todoLista.todos.forEach(todo=>creaTodoHtml(todo));

console.log('todos',todoLista.todos);



