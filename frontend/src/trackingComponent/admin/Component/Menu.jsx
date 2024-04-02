import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut, FiSettings, FiUser, FiHome } from "react-icons/fi";

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<FiSettings />}
        aria-label="Open Drawer"
        onClick={onOpen}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Stack spacing={4}>
                <IconButton icon={<FiHome />} aria-label="Home" />
                <IconButton icon={<FiUser />} aria-label="Profile" />
                <IconButton icon={<FiSettings />} aria-label="Settings" />
                <Text align="center">------------------------------------</Text>
                <IconButton icon={<FiLogOut />} aria-label="Log Out" />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Menu;
