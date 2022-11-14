import React from 'react';
//import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { StateProvider } from './StateProvider';
import reducer, {initialState} from './reducer';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider> 
    </React.StrictMode>
  );

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//     {/* <StateProvider initialState={initialState} reducer={reducer}>
//       <App />
//     </StateProvider> */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// import React from 'react';

// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';





