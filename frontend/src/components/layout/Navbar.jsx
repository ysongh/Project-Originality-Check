import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Badge, Button, Link } from '@chakra-ui/react';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

import ProjectOriginalityCheck from "../../artifacts/contracts/ProjectOriginalityCheck.sol/ProjectOriginalityCheck.json";
import ProjectNFT from "../../artifacts/contracts/ProjectNFT.sol/ProjectNFT.json";
import { getSchemaInformation } from '../../utils/EAS';
import { getLatest25Attestations } from '../../utils/Graphql';

const LOCAL_PROJECT_CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const LOCAL_PROJECT_NFT_CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

function Navbar({ ethAddress, setETHAddress, setProjectContract, setnftContract, seteasSDK, setuserSigner }) {
  const [networkName, setnetworkName] = useState("");

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const etherprovider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = etherprovider.getSigner();
    console.log(signer);
    setuserSigner(signer);

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress);

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider(
      "sepolia"
    );

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(signer);

    seteasSDK(eas);

    const { name, chainId } = await provider.getNetwork();
    console.log(name, chainId);
    setnetworkName(name);
    getSchemaInformation(provider);
    getLatest25Attestations();

    // const contract1 = new ethers.Contract(LOCAL_PROJECT_CONTRACT_ADDRESS, ProjectOriginalityCheck.abi, signer);
    // setProjectContract(contract1);

    // const contract2 = new ethers.Contract(LOCAL_PROJECT_NFT_CONTRACT_ADDRESS, ProjectNFT.abi, signer);
    // setnftContract(contract2)
  }

  return (
    <Box bg="orange.100">
      <Container maxW='1200px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">Searchable Project</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/create-project">Add Project</Link>
          <Spacer />
          {networkName && <p><Badge bgColor="#ff99fe" fontSize='.9rem'>{networkName}</Badge></p>}
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;