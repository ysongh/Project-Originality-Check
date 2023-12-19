import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject.jsx';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [projectContract, setProjectContract] = useState(null);
  const [nftContract, setnftContract] = useState(null);
  const [easSDK, seteasSDK] = useState(null);

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setProjectContract={setProjectContract}
          setnftContract={setnftContract}
          seteasSDK={seteasSDK} />
        <Routes>
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
          <Route
            path="/create-project"
            element={<CreateProject projectContract={projectContract} nftContract={nftContract} easSDK={easSDK} />} />
          <Route
            path="/"
            element={<Home projectContract={projectContract} easSDK={easSDK} />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
