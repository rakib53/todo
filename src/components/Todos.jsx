import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import styles from "../styles/Todos.module.css";
import Todo from "./Todo";

const Todos = ({ todos, handleAddTodo }) => {
  const [searchByTodoName, setSearchByTodoName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("all");

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

        <div className={styles.totalTodoCount}>
          {`Total ${
            todos?.length > 1
              ? todos?.length + " items left"
              : todos?.length + " item left"
          }`}
        </div>
      </div>
    </div>
  );
};

export default Todos;
