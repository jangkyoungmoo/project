import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"
import ItemDetail from "../src/pages/ItemDetail/ItemDetail.jsx";
import ProductAdd from "../src/pages/ItemDetail/ProductAdd";
import ProductEdit from "../src/pages/ItemDetail/ProductEdit.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/item/:id" element={<ItemDetail/>} />
          <Route path="/add" element={<ProductAdd />} />
          <Route path="/edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;