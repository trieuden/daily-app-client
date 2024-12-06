import Main from './src/app/views/Main';
import { useState } from 'react';
import Login from './src/app/views/components/login';

export default function App() {

  const [key, setKey] = useState(false);


  return (
    <>
      {
        key == true ? (
          <Main setKey={setKey}/>
        ) : (
          <Login setKey={setKey}/>
        )
      }
    </>
  );
}

