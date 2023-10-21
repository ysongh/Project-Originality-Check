import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';

import ProjectOriginalityCheck from "../../artifacts/contracts/ProjectOriginalityCheck.sol/ProjectOriginalityCheck.json";
import ProjectNFT from "../../artifacts/contracts/ProjectNFT.sol/ProjectNFT.json";

const LOCAL_PROJECT_CONTRACT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
const LOCAL_PROJECT_NFT_CONTRACT_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

function Navbar({ ethAddress, setETHAddress, setProjectContract, setnftContract }) {
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);

    const contract1 = new ethers.Contract(LOCAL_PROJECT_CONTRACT_ADDRESS, ProjectOriginalityCheck.abi, signer);
    setProjectContract(contract1);

    const contract2 = new ethers.Contract(LOCAL_PROJECT_NFT_CONTRACT_ADDRESS, ProjectNFT.abi, signer);
    setnftContract(contract2)
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
          <Link as={ReactLink} to="/create-project">Add Project</Link>
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