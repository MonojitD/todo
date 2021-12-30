//Selectors
const input = document.querySelector("input");
const btn = document.querySelector(".addTask > button");

//Eventlistners
document.addEventListener("DOMContentLoaded", getList);
btn.addEventListener("click", addList);
input.addEventListener("keyup", (e) => {
  e.keyCode === 13 ? addList(e) : null;
});

//Functions
function addList(e) {
  const notCompleted = document.querySelector(".notCompleted");
  const Completed = document.querySelector(".Completed");

  //Create li
  const newLi = document.createElement("li");

  //Add Local Storage
  saveLocal(input.value);

  //Checked Button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';

  //Delete Button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = '<i class="fas fa-trash"></i>';

  if (input.value !== "") {
    newLi.textContent = input.value;
    input.value = "";
    notCompleted.style.display = "block";
    notCompleted.appendChild(newLi);
    newLi.appendChild(delBtn);
    newLi.appendChild(checkBtn);
  }

  // Checked List
  checkBtn.addEventListener("click", function () {
    const parent = this.parentNode;
    Completed.style.display = "block";
    Completed.appendChild(parent);
    checkBtn.style.display = "none";
  });

  //Delete List
  delBtn.addEventListener("click", function () {
    const parent = this.parentNode;
    parent.remove();
  });
}

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getList(todos) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todos);
  todos.forEach(function (todo) {
    const notCompleted = document.querySelector(".notCompleted");
    const Completed = document.querySelector(".Completed");

    //Create li
    const newLi = document.createElement("li");

    //Checked Button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';

    //Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';

    if (todo !== "") {
      newLi.textContent = todo;
      input.value = "";
      notCompleted.style.display = "block";
      notCompleted.appendChild(newLi);
      newLi.appendChild(delBtn);
      newLi.appendChild(checkBtn);
    }

    // Checked List
    checkBtn.addEventListener("click", function () {
      const parent = this.parentNode;
      parent.remove();
      Completed.style.display = "block";
      Completed.appendChild(parent);
      checkBtn.style.display = "none";
    });

    //Delete List
    delBtn.addEventListener("click", function () {
      const parent = this.parentNode;
      delLocalList(todo);
      parent.remove();
    });
  });
}

function delLocalList(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const delIndex = todos.indexOf(todo);
  todos.splice(delIndex, 1);

  //Saving deleted item in Local Storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
