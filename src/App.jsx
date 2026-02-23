
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/authLogin/Login';
import Dashboard from './Pages/authLogin/Dashboard';
import Layout from './Component/Layout';
import ProtectedRoute from './Component/ProtectedRoute';
// import { Home } from 'lucide-react';
// import Homepage from './Pages/Home/homepage';
// import HomeList from './Pages/Home/HomeList';
// import CreateHomeContent from './Pages/Home/homepage';
import Createpost from './Pages/Home/Createpost';
import ProductList from './Pages/product/ProductList';
import ContactList from './Pages/contact/Contact';
import Category from './Pages/category/category';
import TechNews from './Pages/TechNews/TechNews';
import TechCategory from './Pages/technology/category';
import Technology from './Pages/technology/technology';
import QueriesTable from './Pages/query/QueriesTable';
import CategoryBlog from './Pages/Home/category/category';
import Gallery from './Pages/gallery/Gallery';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes - wrapped with Layout */}    
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homepage" element={<Createpost/>} />
            <Route path="/getpost" element={<ProductList/>} />
            <Route path="/contact" element={<ContactList />} />
            <Route path="/category" element={<Category/>} />
            <Route path="/techcreate" element={<TechNews/>} />
            <Route path="/techcategory" element={<TechCategory/>}/>
            <Route path="/technology" element={<Technology/>}/>
            <Route path="/blogcategory" element={<CategoryBlog/>}/>
            <Route path="/queries" element={<QueriesTable />} />
            <Route path="/gallery" element={<Gallery/>}/>
          
          </Route>
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;