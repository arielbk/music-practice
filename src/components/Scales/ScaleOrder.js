import {
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { BiShuffle } from 'react-icons/bi';

const ScaleOrderModal = ({ order, setOrder }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button leftIcon={<BiShuffle />} onClick={onOpen}>
        Scale Order
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent width="600px" px={16} py={8}>
          <ModalCloseButton />
          <Heading size="md" mt={8}>
            Select the configuration in which scales should appear:
          </Heading>
          <RadioGroup onChange={setOrder} value={order}>
            <Stack py={8}>
              <Radio value="0">Major clockwise, minor counterclockwise</Radio>
              <Radio value="1">Major and minor shuffle</Radio>
              <Radio value="2">Major clockwise</Radio>
              <Radio value="3">Major shuffle</Radio>
              <Radio value="4">Minor counterclockwise</Radio>
              <Radio value="5">Minor shuffle</Radio>
            </Stack>
          </RadioGroup>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ScaleOrderModal;
