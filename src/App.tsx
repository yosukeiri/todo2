import React, { useState, useEffect } from "react";
import InputTodo from "./components/InputTodo";
import Feed from "./components/Feed";
import Layout from "./components/Layout";
import style from "./App.module.css";
import { db } from "./firebase";
import { Heading } from "@chakra-ui/react";
const App: React.FC = () => {
  const [todos, setTodos] = useState([
    {
      id: "",
      title: "",
      status: "Waiting",
      detail: "",
      deadline: "",
      createdDate: "",
      updateDate: "",
    },
  ]);
  const [todoStatusFilter, setTodoStatusFilter] = useState("すべて");
  const [todoSort, setTodoSort] = useState("none");
  const statusList = [
    { value: "all", label: "all" },
    { value: "Waiting", label: "Waiting" },
    { value: "Working", label: "Working" },
    { value: "Completed", label: "Completed" },
  ];
  const sortTodo = [
    { value: "none", label: "ソートなし" },
    { value: "title", label: "タスク名" },
    { value: "status", label: "ステータス" },
    { value: "deadline", label: "期限" },
  ];
  useEffect(() => {
    const unSub = db
      .collection("todos")
      .orderBy("deadline", "desc")
      .onSnapshot((snapshot) =>
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            status: doc.data().status,
            detail: doc.data().detail,
            deadline: doc.data().deadline,
            createdDate: doc.data().createdDate,
            updateDate: doc.data().updateDate,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);
  const onChangeStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetOption = statusList.filter((status) => {
      return status.value === e.target.value;
    });
    setTodoStatusFilter(targetOption[0].label);
  };
  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetOption = sortTodo.filter((sortTodo) => {
      return sortTodo.value === e.target.value;
    });
    setTodoSort(targetOption[0].value);
  };
  let newTodos: typeof todos = [...todos];
  // if (todoStatusFilter !== "すべて") {
  //   newTodos = newTodos.filter((todo) => {
  //     return todo.status === todoStatusFilter;
  //   });
  // }
  // if (todoSort !== "none") {
  //   newTodos = newTodos.sort((a, b) => {
  //     if (a[todoSort] > b[todoSort]) return -1;
  //     if (b[todoSort] > a[todoSort]) return 1;

  //     return 0;
  //   });
  // }
  return (
    <Layout>
      <div className={style.wrapp}>
        <InputTodo />
        <Heading mb="20px">TODO一覧</Heading>
        <div className={style.feeds}>
          {todos[0]?.id && (
            <>
              {newTodos.map((todo) => (
                <Feed
                  id={todo.id}
                  key={todo.id}
                  title={todo.title}
                  status={todo.status}
                  detail={todo.detail}
                  deadline={todo.deadline}
                  createdDate={todo.createdDate}
                  updateDate={todo.updateDate}
                />
              ))}
            </>
          )}
        </div>
        <div className="filter-area">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onChangeStatusFilter(e)
            }
          >
            {statusList.map((status) => (
              <option value={status.value} key={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-area">
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onChangeSort(e)
            }
          >
            {sortTodo.map((sortTodo) => (
              <option value={sortTodo.value} key={sortTodo.value}>
                {sortTodo.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default App;
