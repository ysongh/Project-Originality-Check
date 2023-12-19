import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Box, ButtonGroup, Input, Heading, Button } from '@chakra-ui/react';
import { NFTStorage, File } from 'nft.storage';

import { NFTSTORAGE_APIKEY } from "../keys";
import { createOnchainAttestations } from '../utils/EAS';

const client = new NFTStorage({ token: NFTSTORAGE_APIKEY });

function CreateProject({ projectContract, nftContract, easSDK }) {
  const router = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');
  const [cidurl, setcidurl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleUpload = event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  }

  const handleSubmit = async () => {
    try{
      setLoading(true);
      // setLoadingText("Uploading Data to IPFS...")
      // const imageFile = new File([ image ], image.name, { type: image.type });
      // const metadata = await client.store({
      //     name: title,
      //     description: description,
      //     image: imageFile
      // });

      // console.log(metadata);
      // const arr = metadata.data.image.pathname.split("/");
      // const imageURL = `https://${arr[2]}.ipfs.dweb.link/${arr[3]}`;
      // setcidurl(metadata.url);

      const imageURL = "ipfs://bafyreifuhu6veofqib3kjgsunu7ex2vzx5ecf4ei36cjoru5kkol23soea/metadata.json";

      setLoadingText("Creating Project...")
      console.log(title, description, url);
      await createOnchainAttestations(easSDK, title, description, url, imageURL, [tag]);
      // const transaction = await projectContract.insertProject(title, description, url, imageURL, tag);
      // const tx = await transaction.wait();
      // console.log(tx);
      // setLoadingText("Minting NFT...")
      // const transaction1 = await nftContract.mintProject(cidurl);
      // const tx1 = await transaction1.wait();
      // console.log(tx1);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }  
  }

  return (
    <div>
      <center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='orange' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading fontSize='2xl' mb='3'>Add Project</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input id='title' onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Input id='description' onChange={(e) => setDescription(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='URL'>URL</FormLabel>
            <Input id='URL' onChange={(e) => setUrl(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Upload Cover Photo</FormLabel>
            <input type='file' id='photo' onChange={handleUpload}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='tag'>Tag</FormLabel>
            <Input id='tag' onChange={(e) => setTag(e.target.value)}/>
          </FormControl>
          <ButtonGroup spacing='6'>
            <Button colorScheme='orange' onClick={handleSubmit} isLoading={loading} loadingText={loadingText}>
              Create
            </Button>
            <Button onClick={() => router.push('/')}>Cancel</Button>
          </ButtonGroup>
          <p>{cidurl}</p>
        </Box>
      </center>
    </div>
  )
}

export default CreateProject;