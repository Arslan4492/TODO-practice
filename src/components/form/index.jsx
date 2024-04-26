import { v4 as uuidv4 } from "uuid";

const TODOForm = ({ todos, setTodos }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const value = event.target.todo.value;
    const newTodo = {
      title: value,
      id: uuidv4(),
      is_completed: false,
    };

    // Update todo state
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Store updated todo list in local storage
    const updatedTodoList = JSON.stringify([...todos, newTodo]);
    localStorage.setItem("todos", updatedTodoList);

    event.target.reset();
  };
  return (
    <form
      className="self-center w-[97%] max-w-[455px] flex items-center gap-3 mt-[38px]"
      onSubmit={handleSubmit}
    >
      <label className="w-[90%]" htmlFor="todo">
        <input
          className="bg-gray-800 text-white w-full h-[50px] p-3 rounded-[11px] border-none outline-none"
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>

      <button className="flex items-center justify-center bg-[#88ab33] rounded-lg border-none p-3">
        <span className="absolute h-px w-px overflow-hidden whitespace-nowrap p-0 border-0 clip:rect(1px, 1px, 1px, 1px)">
          Submit
        </span>
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </form>
  );
};

export default TODOForm;
