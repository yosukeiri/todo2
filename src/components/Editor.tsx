import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Heading,
  Input,
  Textarea,
  Select,
  Flex,
} from "@chakra-ui/react";
import { db } from "../firebase";
import firebase from "firebase/app";

interface PROPS {
  todo: any;
}
const Editor: React.FC<PROPS> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(props.todo.title);
  const [detail, setDetail] = useState(props.todo.detail);
  const [deadline, setDeadline] = useState(props.todo.deadline);
  const [status, setStatus] = useState(props.todo.status);
  const statusList = [
    { value: "Waiting", label: "Waiting" },
    { value: "Working", label: "Working" },
    { value: "Completed", label: "Completed" },
  ];
  const updateEditContents = () => {
    db.collection("todos").doc(props.todo.id).update({
      title: title,
      status: status,
      detail: detail,
      deadline: deadline,
      updateDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
    onClose();
  };
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} w="10%">
        編集
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.todo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                タスク名
              </Heading>
              <Input
                placeholder="タスクの見出し"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                期限
              </Heading>
              <Input
                type={"date"}
                placeholder="タスクの期限"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                ステータス
              </Heading>
              <Select
                placeholder="Select option"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                {statusList.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                内容
              </Heading>
              <Textarea
                placeholder="タスクの内容"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </HStack>
            <Flex justify="center">
              <Button colorScheme="blue" onClick={updateEditContents}>
                編集内容の登録
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Editor;
