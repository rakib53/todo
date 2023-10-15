import { useEffect, useState } from "react";
import MyContext from "./ContextAPI/Context";
import AddTodoInput from "./components/AddTodoInput";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Click to Open modal
  const handleAddTodo = () => {
    setIsOpenModal(true);
  };

  // Click to close modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  // If you have any todo in the localstorage that will load first
  useEffect(() => {
    const todosFromLocalStorage =
      JSON.parse(localStorage.getItem("myTodos")) || [];
    console.log(todosFromLocalStorage);
    setTodos(todosFromLocalStorage);
  }, []);

  return (
    <MyContext.Provider
      value={{
        todos,
        setTodos,
        setIsOpenModal,
        isOpenModal,
        setTodos,
        handleAddTodo,
        handleCloseModal,
      }}
    >
      <header className="header"></header>
      {isOpenModal && <AddTodoInput />}
      <Todos />
    </MyContext.Provider>
  );
}

export default App;
