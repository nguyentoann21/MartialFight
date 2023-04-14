import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoutes } from '../src/routes';
import { MainLayout } from '../src/components/Layouts';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
               {publicRoutes.map((route, index) => {
                  let Layout = MainLayout;
                  if (route.layout === null) {
                     Layout = Fragment;
                  } else if (route.layout) {
                     Layout = route.layout;
                  }
                  const Page = route.component;
                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}
            </Routes>
         </Router>
    </div>
  );
}

export default App;