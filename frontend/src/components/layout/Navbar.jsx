import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react';

function Navbar({ ethAddress, setETHAddress }) {
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
  }

  return (
    <Box p={2}>
      <Container maxW='1200px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">Project Originality Check</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/test">Test</Link>
          <Spacer />
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;