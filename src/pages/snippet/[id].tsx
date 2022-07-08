import { ReactNode, useEffect } from "react";
import {
  Box,
  Flex,
  Link,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import Script from "next/script";
import { MoonIcon, SunIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { GetServerSideProps } from "next";
import { User } from "src/types";
import { developerRoute } from "src/util/redirects";
import { withSession } from "src/util/session";
import styles from "../../styles/Basic.module.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const TextEditor = dynamic(import("../../components/textEditor"), {
  ssr: false,
});

interface Props {
  user?: User;
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Snippet({ user }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const POST_ID = router.query.id;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>CodeBin</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.avatar} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={user.avatar} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user?.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Codes</MenuItem>
                    <MenuItem>
                      <Link href="/api/auth/logout" style={{ width: "100%" }}>
                        Logout
                      </Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Center>
        <h1 className={styles.bitSmall}>You are viewing post {POST_ID}</h1>
      </Center>

      <div id="editor">
        
      </div>
      
      <TextEditor lan="javascript" theme="twilight" />
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  withSession(developerRoute);
