const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

btnTarefa.addEventListener('click', function() {
  if(inputTarefa.value.length === 0) return;
    criaTarefa(inputTarefa.value);
});

inputTarefa.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
      if(inputTarefa.value.length === 0) return;
      criaTarefa(inputTarefa.value);
    }
});

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function criaTarefa(inputTexto) {
  const liTarefas = criaLi();
  liTarefas.innerHTML = inputTexto; 
  tarefas.appendChild(liTarefas);  
  limpaInput();
  criaBotaoApagar(liTarefas);
  salvarTarefas();
}

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotaoApagar(liTarefas) {
  liTarefas.innerHTML += ' '; 

  const botaoApagar = document.createElement('button'); 
  botaoApagar.setAttribute('class', 'apagar'); 
  botaoApagar.innerHTML = 'Apagar'; 

  liTarefas.appendChild(botaoApagar); 
}


document.addEventListener('click', function(event) {
  const elemento = event.target;

  if(elemento.classList.contains('apagar')) {
    elemento.parentElement.remove();  
    salvarTarefas(); 
  }
});

function salvarTarefas() {
  const selecionaTarefas = tarefas.querySelectorAll('li');
  const listaTarefas = [];

  for (let tarefa of selecionaTarefas) { 
    let tarefaTexto = tarefa.innerText; 
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); 

    listaTarefas.push(tarefaTexto); 
  }


  const tarefasJSON = JSON.stringify(listaTarefas);
  localStorage.setItem('tarefas', tarefasJSON); 
}

function recarregaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas'); 
  const tarefasReconvertidas = JSON.parse(tarefas); 

  for (let tarefa of tarefasReconvertidas) {  
    criaTarefa(tarefa);
  }
}

recarregaTarefasSalvas();