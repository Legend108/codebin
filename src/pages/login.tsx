import { ReactNode, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
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
  Spinner,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import { User, UserData } from "src/types";
import { developerRoute } from "src/util/redirects";
import { withSession } from "src/util/session";
import styles from '../styles/Basic.module.css';
import Router from "next/router";

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

export default function Login({ user }: Props) {
  if(typeof window == "undefined") return;
  let showAuth;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user) {
      Router.push("/done/create");
    };
  }, []);
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

      {user && (
        <>
          <Center>
            {user && (
              <>
                <h1 className={styles.bitMoreSmall}>
                  You are logged in, Redirecting... <Spinner size="xl" />
                </h1>
              </>
            )}
          </Center>
        </>
      )}

      {!user && (
        <>
          <Center>
            <h1 className={styles.bitSmall}>Login to continue</h1>
          </Center>

          <Center>
            <Button className={styles.prettySmall}>
              <NextLink href="/api/auth/login">Login with Discord</NextLink>
            </Button>
          </Center>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  withSession(developerRoute);
