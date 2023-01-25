import React from "react";
import { Box, HStack, Heading, Button } from "@chakra-ui/react";
import Detail from "./Detail";
import Editor from "./Editor";
import { db } from "../firebase";

interface PROPS {
  id: string;
  title: string;
  status: string;
  detail: string;
  deadline: string;
  createdDate: any;
  updateDate: any;
}

const Feed: React.FC<PROPS> = (props) => {
  const todo = {
    id: props.id,
    title: props.title,
    status: props.status,
    detail: props.detail,
    deadline: props.deadline,
    createdDate: new Date(props.createdDate?.toDate()).toLocaleString(),
    updateDate: new Date(props.updateDate?.toDate()).toLocaleString(),
  };
  const deleteTodo = () => {
    db.collection("todos").doc(props.id).delete();
  };
  return (
    <Box mb="10px" bg="yellow.200" p="10px">
      <HStack>
        <Heading size="sm" w="30%">
          {props.title}
        </Heading>
        <HStack w="20%">
          <Heading size="sm" w="40%">
            ステータス
          </Heading>
          <Box>{props.status}</Box>
        </HStack>
        <HStack w="20%">
          <Heading size="sm" w="20%">
            期限
          </Heading>
          <Box>{props.deadline}</Box>
        </HStack>
        <Detail todo={todo} />
        <Editor todo={todo} />
        <Button colorScheme="red" onClick={deleteTodo} w="10%">
          削除
        </Button>
      </HStack>
    </Box>
  );
};

export default Feed;
