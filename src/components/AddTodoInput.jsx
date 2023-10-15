import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MyContext from "../ContextAPI/Context";
import styles from "../styles/AddTodoInput.module.css";

function AddTodoInput() {
  const [todo, setTodo] = useState({
    title: "",
    category: "all",
    isCompleted: false,
  });
  const clickOutSideToCloseModalRef = useRef(null);
  const { setIsOpenModal, setTodos, handleCloseModal } = useContext(MyContext);

  // adding a todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: todo?.title,
      category: todo?.category,
      isCompleted: false,
    };
    const existingTodos = localStorage.getItem("myTodos");
    const existingTodosArray = JSON.parse(existingTodos);
    if (!existingTodosArray) {
      setTodos([newTodo]);
      localStorage.setItem("myTodos", JSON.stringify([newTodo]));
    } else {
      setTodos([...existingTodosArray, newTodo]);
      existingTodosArray.push(newTodo);
      localStorage.setItem("myTodos", JSON.stringify(existingTodosArray));
    }
  };

  // If user click outside of the modal then the modal will close
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        clickOutSideToCloseModalRef.current &&
        !clickOutSideToCloseModalRef.current.contains(event.target)
      ) {
        setIsOpenModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [clickOutSideToCloseModalRef, setIsOpenModal]);

  return (
    <div className={`${styles.addTodoInputWrapper}`}>
      <div
        className={styles.addTodoInputContent}
        ref={clickOutSideToCloseModalRef}
      >
        <div className={styles.addTodoHeader}>
          <h3 className={styles.addTodoText}>Add todo</h3>
          <AiOutlineClose className={styles.close} onClick={handleCloseModal} />
        </div>
        <div className={styles.todoAddcontentWrapper}>
          <input
            type="text"
            className={styles.addTodo}
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <select
            id="myTodo"
            className={styles.selectCategory}
            value={todo.category}
            onChange={(e) => setTodo({ ...todo, category: e.target.value })}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="home"> Home</option>
            <option value="study"> Study</option>
            <option value="entertainment"> Entertainment</option>
            <option value="fitness">Fitness</option>
          </select>
          <button className={styles.addTodoBtn} onClick={handleAddTodo}>
            Add todo
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AddTodoInput;
