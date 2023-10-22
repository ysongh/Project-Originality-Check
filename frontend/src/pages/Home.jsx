import { useState, useEffect } from "react";
import { Container, Heading, InputGroup, Input, InputRightElement, Text, Image, SimpleGrid, Box, Button  } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

import { getProjectsFromTableland, getProjectsByTagFromTableland } from "../utils/Tableland";

function Home({ projectContract }) {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const getProjects = async () => {
  //     const newProjects = await projectContract.getPosts();
  //     setProjects(newProjects);
  //   }

  //   if (projectContract) getProjects();
  // }, [projectContract])

  useEffect(() => {
    const getProjects = async () => {
      const newProjects = await getProjectsFromTableland();
      setProjects(newProjects);
    }

    getProjects();
  }, [])

  const getProjectsByTag = async () => {
    const newProjects = await getProjectsByTagFromTableland(search);
    setProjects(newProjects);
  }

  return (
    <Container maxW='1200px'>
      <Heading>Find Projects</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search by Tag' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement onClick={getProjectsByTag}>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Heading mt="2">Projects</Heading>
      <SimpleGrid minChildWidth='300px' spacing='40px'>
        {projects.map(p => (
          <Box key={p.id} borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' mt='5'>
            <Image src={p.image_url} />
            <Heading textAlign="center" fontSize="3xl" mb="4">{p.title}</Heading>
            <Text textAlign="center" fontSize="xl">{p.description}</Text>
            <Text textAlign="center" fontSize="xl">{p.date_created}</Text>
            <Text textAlign="center" fontSize="xl">{p.url}</Text>
            <Text textAlign="center" fontSize="xl">{p.tag}</Text>
            <br />
            <Button mt="4" onClick={() => navigate(`/`)}>View</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home