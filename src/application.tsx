import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';

const Application: React.FunctionComponent<{}> = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path={'/'}
            element={
              <Home
                title="explore all the planets of the universe"
                {...props}
              />
            }
          />
          <Route
            path={'/detail/:uid'}
            element={<Detail title="Detail For" {...props} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Application;
