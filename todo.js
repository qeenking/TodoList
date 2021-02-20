const toDoForm = document.querySelector('.js-toDoForm'),
    toDoinput = toDoForm.querySelector('input'),
    toDolist = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = []; // 이후 cleanToDos로 재정의 해줘야하기 때문에 const로 정의해선 안됨

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDolist.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}       
// arrey.filter(function) = arrey 안에 있는 각 항들에 모두 function에 부합하는지 판단 후, true인 것만 가지고 새로운 array를 제작해준다.
// parseInt(string) =  string을 number로 바꿔줌

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify() = array의 object들을 string으로 바꿔줌
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1

    delBtn.innerHTML = '';
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDolist.appendChild(li); // appendchild = 자식으로서 ()안에 있는 것을 추가
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value = '';
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // JSON.parse() = string형태의 자료를 object로 바꿔줌
        parsedToDos.forEach(function(toDo) { // array.forEach(function) = array 안의 각 항목들에 대해서 function을 한번씩 실행해줌
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();