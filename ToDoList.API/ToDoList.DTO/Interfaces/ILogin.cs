using System;
using System.Collections.Generic;
using System.Text;
using ToDoList.DTO.Models;
using ToDoList.DTO.ToDoListDTO;

namespace ToDoList.DTO.Interfaces
{
    public interface ILogin
    {
        UserInfo LoginManager(Login login);
        string UserManager(User user);
        string UpdateUser(User user);
        string DeleteUser(User user);
    }
}
