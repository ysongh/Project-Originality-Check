import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Box, ButtonGroup, Spinner, Input, Heading, Button } from '@chakra-ui/react';

function CreateProject({ projectContract }) {
  const router = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try{
      console.log(title, description, url);
      const transaction = await projectContract.addProject(url);
      const tx = await transaction.wait();
      console.log(tx);
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
          {loading
            ? <Spinner color='orange' />
            : <ButtonGroup spacing='6'>
                <Button colorScheme='orange' onClick={handleSubmit}>
                  Create
                </Button>
                <Button onClick={() => router.push('/')}>Cancel</Button>
              </ButtonGroup>
          }
        </Box>
      </center>
    </div>
  )
}

export default CreateProject;