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
import { MoonIcon, SunIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { User, UserData } from "src/types";
import { developerRoute } from "src/util/redirects";
import { withSession } from "src/util/session";
import styles from "../styles/Basic.module.css";

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

export default function Home({ user }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <h1 className={styles.large}>
          Welcome to <span style={{ color: "rgb(49 151 149);" }}>CodeBin</span>
        </h1>
      </Center>

      <Center>
        <div className={styles.bitMoreSmall}>Upload and share code rapidly</div>
      </Center>

      <Center>
        <div>
          <Button className={styles.prettySmall}>
            <NextLink href={"/login"}>Get started -&gt;</NextLink>
          </Button>
        </div>
      </Center>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  withSession(developerRoute);
