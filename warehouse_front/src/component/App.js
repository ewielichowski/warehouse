import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemView from './itemview/ItemView';
import Layout from './Layout';
import RequestView from './requestview/RequestView';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={      <Layout/>}>
          {/* <Route index element={<Home />} /> */}
          <Route path="items" element={<ItemView />} />
          <Route path="requests" element={<RequestView />} />
          <Route path="*" element={<ItemView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;