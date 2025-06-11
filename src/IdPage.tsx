import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate, useParams } from "react-router";
import {
  getUserData,
  getUserSkillId,
  getUserSkills,
} from "./utils/supabase-function";
import { UserDataRecord } from "./domain/record";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineDatasetLinked } from "react-icons/md";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

import DOMPurify from "dompurify";

// import { Route, Routes } from "react-router";

export function IdPage() {
  const { id } = useParams();
  // const { search } = useLocation();
  const [userData, setUserData] = useState<UserDataRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userDataGetting = async () => {
      try {
        const gettingUserData = await getUserData(id);

        const gettingUserSkill = await getUserSkillId(id);

        const skillId = await gettingUserSkill.skill_id;
        const gettingSkills = await getUserSkills(skillId);

        const skillName = gettingSkills.name;

        const newSkillData = gettingUserData[0];

        newSkillData.skill = skillName;

        setUserData(gettingUserData);
        setLoading(false);
      } catch (error) {
        console.error("IDが一致しません", error);
      }
    };

    userDataGetting();
  }, []);

  // const test = userSkillID.forEach((val) => {
  //   return val;
  // });

  return (
    <>
      <Box w="100vw" h="100vh" bg="gray.200">
        <Center w="100vw" h="100vh">
          <Box>
            {loading && <p>Now loading...</p>}

            {loading ||
              userData.map((data) => (
                <>
                  <Box w="320px" bg="white">
                    <Box boxShadow="md" px="8" py="6">
                      <Heading as="h3" size="lg" textAlign="left">
                        {data.name}
                      </Heading>
                      <Heading as="h4" size="md" pt="6" textAlign="left">
                        自己紹介
                      </Heading>
                      <Box mt="1" textAlign="left">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.description),
                          }}
                        ></div>
                      </Box>

                      <Heading as="h4" size="md" pt="4" textAlign="left">
                        スキル
                      </Heading>
                      <Text mt="1" textAlign="left">
                        {data.skill}
                      </Text>
                      <Center>
                        <Box mt={5}>
                          {data.github_id && (
                            <IconButton
                              variant="outline"
                              aria-label="Search database"
                              as="a"
                              borderColor="transparent"
                              size="sm"
                              href={`https://qiita.com/${data.github_id}`}
                              icon={<FaGithub size="30px" />}
                              data-testid="GitHub"
                              _hover={{
                                background: "none",
                                color: "gray.500",
                              }}
                            />
                          )}
                          {data.qiita_id && (
                            <IconButton
                              variant="outline"
                              aria-label="Search database"
                              as="a"
                              ml="4"
                              borderColor="transparent"
                              size="sm"
                              href={`https://qiita.com/${data.qiita_id}`}
                              icon={<MdOutlineDatasetLinked size="30px" />}
                              data-testid="Qiita"
                              _hover={{
                                background: "none",
                                color: "gray.500",
                              }}
                            />
                          )}
                          {data.x_id && (
                            <IconButton
                              variant="outline"
                              aria-label="Search database"
                              as="a"
                              borderColor="transparent"
                              size="sm"
                              ml="4"
                              href={`https://qiita.com/${data.x_id}`}
                              icon={<FaXTwitter size="30px" />}
                              data-testid="Twitter"
                              _hover={{
                                background: "none",
                                color: "gray.500",
                              }}
                            />
                          )}
                        </Box>
                      </Center>
                    </Box>
                  </Box>
                </>
              ))}
            <Button
              mt="8"
              w="100%"
              colorScheme="teal"
              onClick={() => navigate("/")}
              data-testid="backButton"
            >
              戻る
            </Button>
          </Box>
        </Center>
      </Box>
    </>
  );
}
