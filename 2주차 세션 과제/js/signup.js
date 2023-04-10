const formEl = document.querySelector('#signupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

const isUserExist = (newUserId) => {
  const users = localStorage.getItem('userList');

  if (!users) return false;
  // 로컬스토리지는 무조건 string으로 저장된다.
  // JSON도 string형태로 저장해줌!!

  const convertedUsers = JSON.parse(users);
  const getExistUsers = convertedUsers.find((user) => user.id === newUserId);

  return getExistUsers ? true : false;
};

const registerUser = (userInfo) => {
  const currentUsers = JSON.parse(localStorage.getItem('userList'));

  if (!currentUsers) {
    const newUserList = [];
    newUserList.push({
      id: userInfo.id,
      password: userInfo.password,
    });

    localStorage.setItem('userList', JSON.stringify(newUserList));
  } else {
    const updatedUsers = currentUsers.concat({
      id: userInfo.id,
      password: userInfo.password,
    });
    // push는 원래 배열에 추가, concat은 새로운 배열에 추가하여 만든다.

    localStorage.setItem('userList', JSON.stringify(updatedUsers));
  }
};

const init = () => {
  // 일급객체
  formEl.addEventListener('submit', (e) => {
    // e는 addEventListener로 받은 이벤트이다.
    // e : 이벤트 객체

    e.preventDefault();
    // preventDefault() : 기본으로 실행되는 이벤트를 취소함

    const idValue = idEl.value;
    // .value로 input태그 안에 쓰는 값을 가져온다.
    const passwordValue = passwordEl.value;

    if (isUserExist(idValue)) {
      alert(`${idValue} 유저는 이미 존재합니다!`);
      idEl.value = '';
      passwordEl.value = '';
      return;
    }

    // 회원가입이 가능하다면 이후 코드
    registerUser({ id: idValue, password: passwordValue });
    alert('회원가입 완료!');
    location.href = './signin.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
