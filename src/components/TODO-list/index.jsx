import { useEffect, useRef, useState } from "react";

function TODOList({ todos, setTodos }) {
  return (
    <ol className="self-center w-[97%] max-w-[455px] flex flex-col items-center gap-[27px] my-[27px]">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}

const Item = ({ item, todos, setTodos }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );

    // Update localStorage after marking todo as completed
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();

      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleInputBlur = () => {
    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));

    // Update localStorage after deleting todo
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  };

  return (
    <li
      id={item?.id}
      className="flex justify-between items-center h-[70px] w-full max-w-[455px] border text-base bg-[#0d0d0d] text-white p-3 border-solid border-[#c2b39a]"
    >
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              className="w-[calc(100%_-_14px)] h-[calc(100%_-_12px)] border-transparent outline-transparent text-black"
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button
            className="flex items-center bg-transparent text-white gap-3 text-base border-none"
            onClick={completeTodo}
          >
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              stroke="#22C55E"
              fill={item.is_completed ? "#22C55E" : "#0d0d0d"}
            >
              <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
            </svg>
            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>
          <div className="flex items-center gap-1">
            <button
              className="bg-transparent text-white border-none"
              onClick={handleEdit}
            >
              <svg
                className="fill-[#c2b39a]"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={34}
              >
                <path
                  d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
            <button onClick={handleDelete}>
              <svg
                className="fill-[#c2b39a]"
                xmlns="http://www.w3.org/2000/svg"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                width={32}
                height={34}
              >
                <path
                  d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TODOList;
