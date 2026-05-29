import { Route, Routes } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout.jsx';
import B2B from '../pages/B2B.jsx';
import Conteudo from '../pages/Conteudo.jsx';
import Eventos from '../pages/Eventos.jsx';
import Home from '../pages/Home.jsx';
import Meditacao from '../pages/Meditacao.jsx';
import Mentoria from '../pages/Mentoria.jsx';
import Servicos from '../pages/Servicos.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/mentoria" element={<Mentoria />} />
        <Route path="/mentoria.html" element={<Mentoria />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos.html" element={<Servicos />} />
        <Route path="/meditacao" element={<Meditacao />} />
        <Route path="/meditacao.html" element={<Meditacao />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos.html" element={<Eventos />} />
        <Route path="/conteudo" element={<Conteudo />} />
        <Route path="/conteudo.html" element={<Conteudo />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/b2b.html" element={<B2B />} />
      </Route>
    </Routes>
  );
}
