import { useState, useEffect } from "react";
import { Container, Heading, InputGroup, Input, InputRightElement, Text, SimpleGrid, Box, Button  } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

function Home({ projectContract }) {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const newProjects = await projectContract.getPosts();
      setProjects(newProjects);
    }

    if (projectContract) getProjects();
  }, [projectContract])

  return (
    <Container maxW='1200px'>
      <Heading>Find Projects</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Heading mt="2">Projects</Heading>
      <SimpleGrid minChildWidth='120px' spacing='40px'>
        {projects.map(p => (
          <Box key={p.id} borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' mt='5'>
            <Heading textAlign="center" fontSize="3xl" mb="4">{p.cid}</Heading>
            <Text textAlign="center" fontSize="xl" mb="4">description</Text>
            <br />
            <Button mt="4" onClick={() => navigate(`/`)}>View</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home