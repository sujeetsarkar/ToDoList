using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoList.DTO.Interfaces;
using ToDoList.DTO.Models;
using ToDoList.DTO.ToDoListDTO;

namespace ToDoList.API.BusinessLogic
{
    public class ToDoListBL : ILogin, IToDoList
    {
        private readonly ToDoListContext _DbCtx;
        public ToDoListBL()
        {
            _DbCtx = new ToDoListContext();
        }

        public UserInfo LoginManager(Login login)
        {
            var res = _DbCtx.Users.Where(U => (U.UserName == login.UserName || U.Email == login.UserName)).FirstOrDefault();
            if (res != null && res.PasswordHash == login.Password)
            {
                UserInfo userInfo = new UserInfo
                {
                    UserName = res.UserName,
                    FirstName = res.FirstName,
                    LastName = res.LastName,
                    Email = res.Email,
                    PhoneNumber = res.PhoneNumber
                };
                return userInfo;
            }
            throw new Exception("User Not Found");
        }
        public string UserManager(User user)
        {
            var res = _DbCtx.Users.Add(user);
            if (res != null)
            {
                _DbCtx.SaveChanges();
                return "User Added Successfully";
            }
            throw new Exception("User Can not be added");
        }
        public string UpdateUser(User user)
        {
            var res = _DbCtx.Users.Where(U => U.UserName == user.UserName || U.Email == user.UserName).FirstOrDefault();
            if (res != null)
            {
                res.UserName = user.UserName;
                res.FirstName = user.FirstName;
                res.LastName = user.LastName;
                res.Email = user.Email;
                res.PasswordHash = user.PasswordHash;
                res.PhoneNumber = user.PhoneNumber;
                _DbCtx.SaveChanges();
                return "Successfully Updated";
            }
            throw new Exception("Updation Failed");
        }
        public string DeleteUser(User user)
        {
            var res = _DbCtx.Users.Where(U => U.UserName == user.UserName || U.Email == user.UserName).FirstOrDefault();
            if (res != null)
            {
                _DbCtx.Users.Remove(res);
                _DbCtx.SaveChanges();
                return "Successfully Deleted";
            }
            throw new Exception("Updation Failed");
        }

        public string AddToDoItem(ToDo todo)
        {
            var res = _DbCtx.ToDos.Add(todo);
            if (res != null)
            {
                _DbCtx.SaveChanges();
                return "User Added Successfully";
            }
            throw new Exception("Item Can not be added");
        }

        public IEnumerable<ToDo> GetAllToDoItems(string username)
        {
            try
            {
                int id = _DbCtx.Users.Where(U => U.UserName == username).FirstOrDefault().Id;
                var res = _DbCtx.ToDos.Where(T => T.UserId == id);
                return res;
            }
            catch
            {
                throw new Exception("No Task Found!!!");
            }
        }

        public string DeleteToDoItem(ToDoDTO todo)
        {
            var res = _DbCtx.ToDos.Where(T => T.ListName == todo.ListName && T.Description == todo.Description && T.UserId == todo.UserId).FirstOrDefault();
            if (res != null)
            {
                _DbCtx.ToDos.Remove(res);
                _DbCtx.SaveChanges();
                return "Successfully Deleted";
            }
            throw new Exception("Could Not Delete!!!");
        }

        public string UpdateToDoItem(ToDo todo)
        {
            var res = _DbCtx.ToDos.Where(T => T.Id == todo.Id).FirstOrDefault();
            if (res != null)
            {
                res.ListName = todo.ListName;
                res.Description = todo.Description;

                _DbCtx.SaveChanges();
                return "Successfully Updated";
            }
            throw new Exception("Could Not Update!!!");
        }
    }
}
