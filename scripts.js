document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('todo-input');
    input.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  });
  
  function addTodo() {
    const input = document.getElementById("todo-input");
    const newTodoText = input.value.trim();
  
    if (newTodoText !== "") {
      const list = document.getElementById("todo-list");
      const newTodo = document.createElement("li");
      const contentDiv = document.createElement("div");
      contentDiv.className = "content-div";
  
      const textSpan = document.createElement("span");
      textSpan.textContent = newTodoText;
      textSpan.onclick = function () {
        textSpan.classList.toggle("completed");
      };
      contentDiv.appendChild(textSpan);
  
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "button-div";
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제하기";
      deleteBtn.onclick = function () {
        if (textSpan.classList.contains("completed")) {
          newTodo.remove();
        }
      };
      buttonDiv.appendChild(deleteBtn);
  
      let editInput = null;
      const editBtn = document.createElement("button");
      editBtn.textContent = "수정하기";
      editBtn.onclick = function () {
        if (editInput) {
            textSpan.textContent = editInput.value;
            editInput.remove();
            editInput = null;
          return; 
        }
        editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = textSpan.textContent;
        editInput.className = "edit-input";
        buttonDiv.insertBefore(editInput, editBtn);
        editInput.focus();
  
        editInput.addEventListener('keypress', function (event) {
          if (event.key === 'Enter') {
            textSpan.textContent = this.value;
            editInput.remove();
            editInput = null;
          }
        });
  

      };
      buttonDiv.appendChild(editBtn);
  
      contentDiv.appendChild(buttonDiv);
      newTodo.appendChild(contentDiv);
  
      list.appendChild(newTodo);
      input.value = ""; 
    }
  }
  