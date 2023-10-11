import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

function App() {
  const [ethAddress, setETHAddress] = useState('');

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress} />
        <Routes>
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
          <Route
            path="/"
            element={<Home />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
