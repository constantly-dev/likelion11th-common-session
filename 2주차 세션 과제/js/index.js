const todoContainerEl = document.querySelector('#todoContainer');
const todoInputEl = document.querySelector('#todoInput');
const todoButtonEl = document.querySelector('#todoButton');
const logoutButtonEl = document.querySelector('#logoutButton');

const isLogin = () => {
  const loginedUser = localStorage.getItem('login');
  if (!loginedUser) {
    // loginedUser 값이 없다면 undefined를 변수에 가지고 있으니,
    // !를 붙여 true가 되어 if문을 실행시킨다!
    alert('로그인이 필요합니다!');
    location.href = './signin.html';
  }
};

const readTodo = () => {
  todoContainerEl.innerHTML = '';

  const todos = JSON.parse(localStorage.getItem('todos')).reverse();
  // 값을 거꾸로

  todos.forEach((todo) => {
    const divEl = document.createElement('div');
    const completeEl = document.createElement('input');
    const userEl = document.createElement('p');
    const contentEl = document.createElement('label');
    const deleteEl = document.createElement('button');

    divEl.className = 'todoItem';

    completeEl.type = 'checkbox';
    completeEl.className = 'checkbox';
    completeEl.id = todo.id;
    completeEl.addEventListener('click', () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;
    // checked 속성은 checkbox에서 체크 여부를 결정한다. 따라서 boolean값을 가짐!!!

    deleteEl.type = 'button';
    deleteEl.textContent = 'X';
    deleteEl.className = 'deleteButton';
    deleteEl.addEventListener('click', () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id;
    // label의 for와 input의 id를 연결
    // 또는 label 안에 input을 넣어도 된다. (radio나 checkbox name을 같게 해주면 연관되어진다. )

    // ** htmlFor는? label태그의 for 속성과 같은 것.

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
    // append() : 컨텐츠를 선택된 요소 '내부'의 끝 부분에서 삽입
    // + 시작부분 삽입은 prepend()
    // + ::after와 ::before는 선택한 요소 앞,뒤에 컨텐츠 삽입!!
  });
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem('todos'));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: localStorage.getItem('login'),
  };

  todos.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(todos));
  todoInputEl.value = '';
  //?

  readTodo();
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const filteredTodos = todos.filter((todo) => todo.id !== deleteId);
  //삭제하려는 것을 제외하고, 나머지를 재할당 해주면 원하는 것을 삭제하는 것과 같다!!
  localStorage.setItem('todos', JSON.stringify(filteredTodos));
  readTodo();
};

// complete 업데이트 로직
const updateComplete = (updateId, updateChecked) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const updateTodos = todos.map((updateTodo) => {
    updateTodo.id === updateId
      ? (updateTodo.complete = updateChecked)
      : updateTodo.complete;
    return updateTodo;
  });
  localStorage.setItem('todos', JSON.stringify(updateTodos));
  readTodo();
};
// 로그아웃 로직
const logout = () => {
  alert('로그아웃!');
  localStorage.removeItem('login');
  location.href = './signin.html';
};

const init = () => {
  isLogin();

  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener('click', createTodo);
  logoutButtonEl.addEventListener('click', logout);
};

document.addEventListener('DOMContentLoaded', init);
