import React, { useContext, useState } from "react";
import { LiaCopySolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyContext from "../ContextAPI/Context";
import styles from "../styles/Todo.module.css";
import Popup from "./Popup";

function Todo({ todo }) {
  const [isCopied, setIsCopied] = useState(false);
  const { setTodos } = useContext(MyContext);
  const todosFromLocalStorage = JSON.parse(localStorage.getItem("myTodos"));

  // Click to copy the todo
  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = todo?.title;
    document.body.appendChild(el);
    el.select();

    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 800);
    } catch (err) {
      alert("Oops, unable to copy text to clipboard");
    } finally {
      document.body.removeChild(el);
    }
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    if (todosFromLocalStorage?.length > 0) {
      const filterdTodo = todosFromLocalStorage?.filter((lsTodo) => {
        return lsTodo?.id !== id;
      });
      setTodos(filterdTodo);
      localStorage.setItem("myTodos", JSON.stringify(filterdTodo));
    }
  };

  // update a todo
  const handleUpadteTodo = (id) => {
    const editedTodo = todosFromLocalStorage?.map((todo) => {
      if (todo?.id === id) {
        if (todo?.isCompleted) {
          todo.isCompleted = false;
        } else {
          todo.isCompleted = true;
        }
        return todo;
      } else {
        return todo;
      }
    });
    setTodos(editedTodo);
    localStorage.setItem("myTodos", JSON.stringify(editedTodo));
  };

  return (
    <div className={styles.todoCard}>
      {isCopied && <Popup />}
      <div className={styles.circleAndContentWrapper}>
        {todo?.isCompleted ? (
          <span
            className={styles.circleFill}
            onClick={() => handleUpadteTodo(todo?.id)}
          ></span>
        ) : (
          <span
            className={styles.circleBlank}
            onClick={() => handleUpadteTodo(todo?.id)}
          ></span>
        )}

        <p className={styles.todoContent}>{todo?.title}</p>
      </div>
      <div className={styles.tools}>
        <LiaCopySolid className={styles.copy} onClick={handleCopyClick} />
        <RiDeleteBin6Line
          className={styles.delete}
          onClick={() => handleDeleteTodo(todo?.id)}
        />
      </div>
    </div>
  );
}

export default Todo;
