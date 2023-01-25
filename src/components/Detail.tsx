import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  HStack,
  Heading,
} from "@chakra-ui/react";

interface PROPS {
  todo: any;
}
const Detail: React.FC<PROPS> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} w="10%">
        詳細
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.todo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                期限
              </Heading>
              <Box>{props.todo.deadline}</Box>
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                ステータス
              </Heading>
              <Box>{props.todo.status}</Box>
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                内容
              </Heading>
              <Box>{props.todo.detail}</Box>
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                作成日時
              </Heading>
              <Box>{props.todo.createdDate}</Box>
            </HStack>
            <HStack mb="10px">
              <Heading size="sm" w="30%">
                更新日時
              </Heading>
              <Box>{props.todo.updateDate}</Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Detail;
