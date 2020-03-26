import {Todo} from '../classes';
import {todoLista} from '../index';
//Referencias

const divTodoList=document.querySelector('.todo-list');
const newTodo=document.querySelector('.new-todo');
const clearCompletado=document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const selectFiltro= document.querySelectorAll('.filtro');

export const creaTodoHtml=(todo)=>{

    const htmlTodo=`
    <li class="${(todo.completado)? 'completed':''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado)? 'checked':''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div=document.createElement('div');
    div.innerHTML =htmlTodo;
    
    divTodoList.append(div.firstElementChild);

    return div;
}
// eventos
newTodo.addEventListener('keyup',(event)=>{

    if(event.keyCode===13&&newTodo.value!=0){
        const nuevoTodoTxt= new Todo(newTodo.value);
        todoLista.nuevoTodo(nuevoTodoTxt);
        creaTodoHtml(nuevoTodoTxt);
        newTodo.value='';
        console.log(nuevoTodoTxt.tarea);
    }
    
    
});

divTodoList.addEventListener('click',(event)=>{

    const nombreElemento=(event.target.localName);
    const todoElemento= event.target.parentElement.parentElement;
    const todoID =todoElemento.getAttribute('data-id');
    
    if(nombreElemento.includes('input')){
        todoLista.marcarCompletado(todoID);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoLista.eliminarTodo(todoID);
        divTodoList.removeChild(todoElemento);
    }  
    
});

clearCompletado.addEventListener('click',()=>{

    todoLista.eliminarCompletados();
    
    for(let i=divTodoList.children.length-1;i>=0;i--){

        const elem=divTodoList.children[i];
       if(elem.classList.contains('completed')){
           divTodoList.removeChild(elem);
       }
        
    }


});

filtros.addEventListener('click',(event)=>{
    console.log(event.target.text);
    
    const filtro=event.target.text;
    if(!filtro){return ;}
        selectFiltro.forEach(elem =>elem.classList.remove('selected'));
        event.target.classList.add('selected');
        

    for(const elem of divTodoList.children){
        elem.classList.remove('hidden');
        const completado=elem.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elem.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elem.classList.add('hidden');
                }
                break;
        }


    }
});