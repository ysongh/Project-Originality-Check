import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject.jsx';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [projectContract, setProjectContract] = useState(null);

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setProjectContract={setProjectContract} />
        <Routes>
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
          <Route
            path="/create-project"
            element={<CreateProject projectContract={projectContract} />} />
          <Route
            path="/"
            element={<Home projectContract={projectContract} />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
