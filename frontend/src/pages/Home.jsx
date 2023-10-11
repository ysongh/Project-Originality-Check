import { useState } from "react";
import { Container, Heading, InputGroup, Input, InputRightElement, Text } from '@chakra-ui/react';

function Home() {
  const [search, setSearch] = useState("");

  return (
    <Container maxW='1200px'>
      <Heading>Find Projects</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <Text mr="2" color="blue" fontWeight="bold">Find</Text>
        </InputRightElement>
      </InputGroup>
    </Container>
  )
}

export default Home