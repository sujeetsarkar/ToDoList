using System;
using System.Collections.Generic;
using System.Text;
using ToDoList.DTO.Models;
using ToDoList.DTO.ToDoListDTO;

namespace ToDoList.DTO.Interfaces
{
    public interface IToDoList
    {
        string AddToDoItem(ToDo todo);
        IEnumerable<ToDo> GetAllToDoItems(string username);
        string DeleteToDoItem(ToDoDTO todo);
        string UpdateToDoItem(ToDo todo);
    }
}
