import { useEffect, useState } from "react";
import { TODOForm, TODOHero, TODOList } from "../../components";

const Home = () => {
  const [todos, setTodos] = useState([]);

  // Retrieve data from localStorage when component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const completed = todos.filter((todo) => todo.is_completed === true).length;
  const total = todos.length;

  return (
    <>
      <TODOHero completed={completed} total={total} />
      <TODOForm todos={todos} setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </>
  );
};

export default Home;
