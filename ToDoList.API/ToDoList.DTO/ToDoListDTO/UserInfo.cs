using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoList.DTO.ToDoListDTO
{
    public class UserInfo
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
    }
}
