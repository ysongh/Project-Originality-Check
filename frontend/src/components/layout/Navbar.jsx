import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Badge, Button, Link } from '@chakra-ui/react';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

import ProjectOriginalityCheck from "../../artifacts/contracts/ProjectOriginalityCheck.sol/ProjectOriginalityCheck.json";
import ProjectNFT from "../../artifacts/contracts/ProjectNFT.sol/ProjectNFT.json";

const LOCAL_PROJECT_CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const LOCAL_PROJECT_NFT_CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

function Navbar({ ethAddress, setETHAddress, setProjectContract, setnftContract }) {
  const [networkName, setnetworkName] = useState("");

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const etherprovider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = etherprovider.getSigner();
    console.log(signer);

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress);

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.providers.getDefaultProvider(
      "sepolia"
    );

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(signer);

    const { name, chainId } = await provider.getNetwork();
    console.log(name, chainId);
    setnetworkName(name);

    getAttestation(eas);
    createOnchainAttestations(eas);

    // const contract1 = new ethers.Contract(LOCAL_PROJECT_CONTRACT_ADDRESS, ProjectOriginalityCheck.abi, signer);
    // setProjectContract(contract1);

    // const contract2 = new ethers.Contract(LOCAL_PROJECT_NFT_CONTRACT_ADDRESS, ProjectNFT.abi, signer);
    // setnftContract(contract2)
  }

  const getAttestation = async (eas) => {
    const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";

    const attestation = await eas.getAttestation(uid);

    console.log(attestation);
  }

  const createOnchainAttestations = async (eas) => {
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);
    
    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
    
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0xaa90e02e88047232288D01Fe04d846e8A4Cc88dd",
        expirationTime: 0,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    
    const newAttestationUID = await tx.wait();
    
    console.log("New attestation UID:", newAttestationUID);
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