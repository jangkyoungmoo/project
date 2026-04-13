import {BrowserRouter, Routes, Route} from "react-router-dom"
import RootLayout from "../src/pages/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
        <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
