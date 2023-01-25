import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase/app";
import {
  Input,
  Textarea,
  Button,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";

const InputTodo: React.FC = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");

  const newTodo = () => {
    console.log("newTodo button on");
    db.collection("todos").add({
      title: title,
      status: "Waiting",
      detail: detail,
      deadline: deadline,
      createdDate: firebase.firestore.FieldValue.serverTimestamp(),
      updateDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <Heading mb="20px">タスクの新規登録</Heading>
      <HStack mb="20px">
        <Heading size="sm" w="10%">
          タスク名
        </Heading>
        <Input
          w="90%"
          placeholder="タスクの見出し"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </HStack>
      <HStack mb="20px">
        <Heading size="sm" w="10%">
          内容
        </Heading>
        <Textarea
          w="90%"
          placeholder="タスクの内容"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </HStack>
      <HStack mb="20px">
        <Heading size="sm" w="10%">
          期限
        </Heading>
        <Input
          type={"date"}
          w="90%"
          placeholder="タスクの期限"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </HStack>
      <Flex justify="flex-end">
        <Button colorScheme="blue" onClick={newTodo}>
          タスクの登録
        </Button>
      </Flex>
    </div>
  );
};

export default InputTodo;
