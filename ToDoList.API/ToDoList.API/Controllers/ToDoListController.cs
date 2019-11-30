using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.API.BusinessLogic;
using ToDoList.DTO.Models;
using ToDoList.DTO.ToDoListDTO;

namespace ToDoList.API.Controllers
{
    public class ToDoListController : ControllerBase
    {
        private readonly ToDoListBL _BLInstance;

        public ToDoListController()
        {
            _BLInstance = new ToDoListBL();
        }

        [HttpPost("api/users/authenticate")]
        public ActionResult<UserInfo> Login([FromBody]Login LoginCredentials)
        {
            try
            {
                return Ok(_BLInstance.LoginManager(LoginCredentials));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("api/AddUser")]
        public JsonResult AddUser([FromBody]User user)
        {
            try
            {
               return new JsonResult(Ok(_BLInstance.UserManager(user)));
            }
            catch (Exception ex)
            {
                return new JsonResult (Conflict(ex.Message));
            }
        }

        [HttpPut("api/UpdateUser")]
        public ActionResult<string> UpdateUser([FromBody] User user)
        {
            try
            {
                return Ok(_BLInstance.UpdateUser(user));
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpDelete("api/DeleteUser")]
        public ActionResult<string> DeleteUser([FromBody] User user)
        {
            try
            {
                _BLInstance.DeleteUser(user);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("api/AddItem")]
        public ActionResult<string> AddToDoItem(ToDo todoItem)
        {
            try
            {
                return Ok(_BLInstance.AddToDoItem(todoItem));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
        [HttpGet("api/GetAllItems/{username}")]
        public JsonResult GetAllToDoItems(string username)
        {
            try
            {
                return new JsonResult(Ok(_BLInstance.GetAllToDoItems(username)));
            }
            catch (Exception ex)
            {
                return new JsonResult(NotFound(ex.Message));
            }
        }
        [HttpDelete("api/DeleteItem")]
        public ActionResult<string> DeleteToDoItem(ToDoDTO todoItem)
        {
            try
            {
                _BLInstance.DeleteToDoItem(todoItem);
                return NoContent();
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
            
        }
        [HttpPut("api/UpdateItem")]
        public ActionResult<string> UpdateToDoItem(ToDo todoItem)
        {
            try
            {
                return Ok(_BLInstance.UpdateToDoItem(todoItem));
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}
