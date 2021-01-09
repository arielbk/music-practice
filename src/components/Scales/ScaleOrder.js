import {
  Button,
  Flex,
  Heading,
  HStack,
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

const ScaleOrderModal = ({
  majorOrder,
  setMajorOrder,
  minorOrder,
  setMinorOrder,
}) => {
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
          <Heading size="md" mt={4}>
            Select the configuration in which scales should appear:
          </Heading>
          <Flex justifyContent="space-around" py={8}>
            <RadioGroup onChange={setMajorOrder} value={majorOrder}>
              <Heading size="sm" mb={4}>
                Major
              </Heading>
              <Stack>
                <Radio value="clockwise">Clockwise</Radio>
                <Radio value="counterclockwise">Anti-clockwise</Radio>
                <Radio value="off">Off</Radio>
              </Stack>
            </RadioGroup>
            <RadioGroup onChange={setMinorOrder} value={minorOrder}>
              <Heading size="sm" mb={4}>
                Minor
              </Heading>
              <Stack>
                <Radio value="clockwise">Clockwise</Radio>
                <Radio value="counterclockwise">Anti-clockwise</Radio>
                <Radio value="off">Off</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ScaleOrderModal;
