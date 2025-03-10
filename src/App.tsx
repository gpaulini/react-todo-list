import styles from './App.module.css';
import icoLogo from './assets/logo.svg';
import icoAdd from './assets/add.svg';
import icoClipboard from './assets/clipboard.svg';
import { FormEvent, KeyboardEvent, useState } from 'react';
import { format } from 'date-fns';
import { Task } from './components/Task';

function App() {
  let _tasks = [
    {
      'id': '2025-03-09T20:30:00+++limpar o quarto',
      'description': 'limpar o quarto',
      'isDone': false,
      'createdAt': '2025-03-09T20:10:00'
    },
    {
      'id': '2025-03-09T20:30:00+++estudar react',
      'description': 'estudar react',
      'isDone': true,
      'createdAt': '2025-03-09T20:20:00'
    },
    {
      'id': '2025-03-09T20:30:00+++passear com o cachorro',
      'description': 'passear com o cachorro',
      'isDone': false,
      'createdAt': '2025-03-09T20:30:00'
    }
  ];

  // _tasks = [];

  const [tasks, setTasks] = useState(_tasks);
  const doneTasks = tasks.filter(t => t.isDone);
  const undoneTasks = tasks.filter(t => !t.isDone);

  if (tasks.length) {
    undoneTasks.sort((a, b) => { //most recent at the top
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
  
    doneTasks.sort((a, b) => { //most recent at the top
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
  }

  const sortedTasks = [...undoneTasks, ...doneTasks];

  const handleTaskDescriptionWriting = function (event: KeyboardEvent<HTMLInputElement>) {
    const inputElement = event.target! as HTMLInputElement;
    const submitBtn = inputElement.nextElementSibling as HTMLButtonElement;
    if (inputElement.value.length) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'disabled');
    }
  }

  const handleCreateTask = function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('taskDescription') as HTMLInputElement;
    const description = input!.value;
    const createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    setTasks([
      {
        'id': createdAt + '+++' + description,
        'description': description,
        'isDone': false,
        'createdAt': createdAt
      },
      ...tasks
    ]);

    input.value = '';
    (input.nextElementSibling as HTMLButtonElement).disabled = true;
  };

  const toggleIsDone = function (id: string) {
    setTasks(tasks.map(function (t) {
      if (t.id === id) {
        t.isDone = !t.isDone;
      }
      
      return t;
    }));
  }

  const removeTask = function (id: string) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <>
      <header className={styles.header}>
        <img src={icoLogo} />
        <form
          action="#"
          method="get"
          className={styles.createTaskForm}
          onSubmit={handleCreateTask}
        >
          <input
            name='taskDescription'
            type="text"
            className={styles.createTaskInput}
            placeholder='Adicione uma nova tarefa'
            onKeyUp={handleTaskDescriptionWriting}
          />
          <button
            name='submitBtn'
            type="submit"
            className={styles.createTaskButton}
            disabled
          >
            Criar <img src={icoAdd} width={16} height={16} />
          </button>
        </form>
      </header>

      <main className={`${styles.board} ${tasks.length === 0 && styles.empty}`}>
        <div className={styles.stats}>
          {tasks.length > 0 &&
            <div className={styles.statsCreatedTasks}>
              Tarefas Criadas
              <span className={styles.statsQuantity}>{tasks.length}</span>
            </div>
          }

          {doneTasks.length > 0 &&
            <div className={styles.statsDoneTasks}>
              Concluídas
              <span className={styles.statsQuantity}>{doneTasks.length + ' de ' + tasks.length}</span>
            </div>
          }
          </div>
        <div className={styles.tasks}>
          {sortedTasks.length ? 
            sortedTasks.map(t => <Task
              key={t.id}
              id={t.id}
              description={t.description}
              isDone={t.isDone}
              createdAt={t.createdAt}
              onToggle={() => toggleIsDone(t.id)}
              onRemove={() => removeTask(t.id) }
              />
            )
            :
            <div className={styles.emptyBoardMessage}>
              <img src={icoClipboard} alt="" /><br />
              <strong>Você ainda não tem tarefas cadastradas.</strong><br />
              Crie tarefas e organize seus itens a fazer.
            </div>
          }
        </div>
      </main>
    </>
  )
}

export default App
