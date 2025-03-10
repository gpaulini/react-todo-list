import styles from './Task.module.css';
import icoChecked from './../assets/checked.svg';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Task = function ({description, isDone, createdAt, onRemove, onToggle}: Task) {

  return (
    <div
      className={`${styles.task} ${isDone && styles.doneTask}`}
      title={`Criado em ${format(new Date(createdAt), "PPP 'às' p", {locale: ptBR})}`}
    >
      <div
        className={styles.toggleBtn}
        onClick={onToggle}
      >
        {isDone && <img src={icoChecked} />}
      </div>

      <p className={styles.description}>
        {description}
      </p>

      <button
        type='button'
        className={styles.delBtn}
        onClick={onRemove}
      >
        <div className={styles.icon}></div>
      </button>
    </div>
  );
}