import {Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import AddSuperheroes from './pages/AddSuperheroes';
import AllSuperheroes from './pages/AllSuperheroes';
import EditSuperheroes from './pages/EditSuperheroes';
import DetailSuperheroes from './pages/DetailSuperheroes';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<AllSuperheroes />}></Route>
          <Route path="/add-superhero" element={<AddSuperheroes />}></Route>
          <Route path="/edit-superhero/:id" element={<EditSuperheroes />}></Route>
          <Route path="/details-superhero/:id" element={<DetailSuperheroes />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
