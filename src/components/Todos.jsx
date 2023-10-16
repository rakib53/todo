import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import MyContext from "../ContextAPI/Context";
import styles from "../styles/Todos.module.css";
import Todo from "./Todo";

const Todos = () => {
  const [searchByTodoName, setSearchByTodoName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("all");
  const { todos, handleAddTodo } = useContext(MyContext);

  let content;
  if (todos?.length === 0) {
    content = (
      <div className={styles.noTodoFoundWrapper}>
        <h2 className={styles.noTodoFound}>No todo found!</h2>
      </div>
    );
  }
  if (todos?.length > 0) {
    content = (
      <>
        {todos
          ?.filter((todo) => {
            if (searchByTodoName?.length > 0) {
              return todo?.title
                ?.toLowerCase()
                .includes(searchByTodoName.toLowerCase());
            } else {
              return todo;
            }
          })
          .filter((todo) => {
            if (searchByCategory) {
              return todo?.category === searchByCategory;
            } else {
              return todo;
            }
          })
          .map((todo, index) => {
            return <Todo key={index} todo={todo} />;
          })}
      </>
    );
  }

  return (
    <div className={styles.todoPageWrapper}>
      <div className={styles.todoHeader}>
        <h1 className={styles.logo}>Todo</h1>
        <span className={styles.addTodo} onClick={handleAddTodo}>
          <FaPlus className={styles.add} />
        </span>
      </div>

      <div className={styles.filterWrapper}>
        <div className={styles.filter}>
          <input
            type="text"
            className={styles.searchByTodoInput}
            placeholder={`search like "React js"`}
            value={searchByTodoName}
            onChange={(e) => setSearchByTodoName(e.target.value)}
          />

          <select
            id="todoCatgory"
            className={styles.searchByCategory}
            value={searchByCategory}
            onChange={(e) => setSearchByCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="home"> Home</option>
            <option value="study"> Study</option>
            <option value="entertainment"> Entertainment</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>
      </div>

      <div className={styles.todoWrapper}>
        {content}
        {todos?.length > 0 && (
          <div className={styles.totalTodoCount}>
            {todos?.length > 1
              ? `Total ${todos?.length} items left`
              : todos?.length === 1
              ? `Total ${todos?.length} item left`
              : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
