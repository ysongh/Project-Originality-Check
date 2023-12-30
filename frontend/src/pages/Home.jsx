import { useState, useEffect } from "react";
import { Container, Heading, InputGroup, Input, InputRightElement, Text, Image, SimpleGrid, Box, Button, Tag } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

import { getAttestation } from "../utils/EAS";
import { getAttestationsBySchemaId } from "../utils/Graphql";

function Home({ projectContract, easSDK }) {
  const [search, setSearch] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const getProjects = async () => {
  //     const newProjects = await projectContract.getPosts();
  //     setProjects(newProjects);
  //   }

  //   if (projectContract) getProjects();
  // }, [projectContract])

  useEffect(() => {
    const getAttestations = async () => {
      const data = await getAttestationsBySchemaId();
      console.log(JSON.parse(data?.data?.attestations[0].decodedDataJson));
      setProjects(data?.data?.attestations);
    }
    getAttestations();
  }, [])

  const getProjectsByTag = async () => {
    
  }

  const getProjectsByTitle = async () => {
   
  }

  return (
    <Container maxW='1200px'>
      <Text fontWeight="bold" mt="3">Find Projects By Title</Text>
      <InputGroup bg='white' mb='5'>
        <Input placeholder='Search by Tag' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
        <InputRightElement onClick={getProjectsByTitle}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      <Text fontWeight="bold" mt="2">Find Projects By Tags</Text>
      <InputGroup bg='white'>
        <Input placeholder='Search by Tag' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement onClick={getProjectsByTag}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Heading mt="2">Projects</Heading>
      <SimpleGrid minChildWidth='300px' spacing='40px'>
        {projects.map(p => {
          const project = JSON.parse(p?.decodedDataJson);

          return (
            <Box key={p.id} borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' mt='5'>
              <Image
                src={project[3]?.value?.value}
                fallbackSrc='https://via.placeholder.com/150'
                height={220}
                bg="gray.100"
              />
              <Box p="5">
                <Heading textAlign="center" fontSize="3xl" mb="4">{project[0]?.value?.value}</Heading>
                <Text textAlign="center" fontSize="xl">{project[1]?.value?.value}</Text>
                {/* <Text textAlign="center" fontSize="xl">{p.date_created}</Text> */}
                {project[4]?.value?.value.map((t, index) => (
                  <Tag size="lg" key={index} mr="1">
                    {t}
                  </Tag>
                ))}
                <br />
                <a href={project[2]?.value?.value} target="_blank" rel="noopener noreferrer">
                  <Button mt="4" width="100%" bg="green.300" onClick={() => navigate(`/`)}>
                    Github
                  </Button>
                </a>
                <Button mt="4" width="100%" onClick={() => navigate(`/`)}>
                  View
                </Button>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  )
}

export default Home