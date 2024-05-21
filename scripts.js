//엔터로 등록하기

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('todo-input');
  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });
});

//등록하기
function addTodo() {
  const input = document.getElementById("todo-input");
  const newTodoText = input.value.trim();
  
  if (newTodoText !== "") {
    const list = document.getElementById("todo-list");
    const newTodo = document.createElement("li");
    const contentDiv = document.createElement("div"); //등록되는 하나의 행을 감싸는 div
    contentDiv.className = "content-div";

    const textSpan = document.createElement("span");
    textSpan.textContent = newTodoText;
    textSpan.addEventListener('click', toggleCompleted);//글자를 클릭했느냐 안했느냐(라인쓰루 적용)
    contentDiv.appendChild(textSpan);

    const buttonDiv = document.createElement("div");// 삭제,수정을 감싸는 div
    buttonDiv.className = "button-div";


    addButton(buttonDiv, "삭제하기", () => deleteTodo(newTodo, textSpan));
    addButton(buttonDiv, "수정하기", () => editTodo(buttonDiv, textSpan));

    contentDiv.appendChild(buttonDiv);
    newTodo.appendChild(contentDiv);
    list.appendChild(newTodo);
    input.value = "";
  }
}

function toggleCompleted(event) {//라인쓰루 적용여부  (할일 완료 여부)
  event.target.classList.toggle("completed");
}


//삭제하기 버튼 눌렀을떄 작동
function deleteTodo(newTodo, textSpan) {
  if (textSpan.classList.contains("completed")) {
    newTodo.remove();
  }
}


//수정하기버튼 눌렀을때 작동
let editInput=null;
function editTodo(buttonDiv, textSpan) {
  if (editInput) {//수정input이 열려있는 상태일때 =>수정입력 적용
    textSpan.textContent = editInput.value;
    editInput.remove();
    editInput = null;
  return; 
}
//수정input이 없을떄 input을 만들어준다.
editInput = document.createElement("input");
editInput.type = "text";
editInput.value = textSpan.textContent;
editInput.className = "edit-input";
const editBtn = buttonDiv.querySelector("button:nth-child(2)"); //"수정하기" 버튼이 두 번째에 위치
buttonDiv.insertBefore(editInput, editBtn);
editInput.focus();

//수정하기를 엔터쳐서 입력
editInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    textSpan.textContent = this.value;
    editInput.remove();
    editInput = null;
  }
});

}

//삭제버튼 또는 수정버튼 생성 함수
function addButton(container, text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener('click', onClick);
  container.appendChild(button);
}
