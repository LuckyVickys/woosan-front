import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import { Desktop, Tablet, Mobile } from './layouts/ResponsiveComponent';

function App() {
  return (
    <>
      <Desktop>
        <RouterProvider router={root} />
      </Desktop>
      <Tablet>
        <RouterProvider router={root} />
      </Tablet>
      <Mobile>
        <RouterProvider router={root} />
      </Mobile>
    </>
  );
}

export default App;
