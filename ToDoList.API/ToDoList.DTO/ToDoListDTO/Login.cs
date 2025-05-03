using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoList.DTO.ToDoListDTO
{
    public class Login
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
