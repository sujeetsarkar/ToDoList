using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoList.DTO.ToDoListDTO
{
    public class ToDoDTO
    {
        public required string ListName { get; set; }
        public required string Description { get; set; }
        public int UserId { get; set; }
    }
}
