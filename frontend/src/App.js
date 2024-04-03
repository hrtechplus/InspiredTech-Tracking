import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

// pages & components
import Home from './inventoryControl/pages/Home';
import AddItems from './inventoryControl/pages/AddItems';
import UpdateItemPage from './inventoryControl/pages/UpdateItemPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/inventoryPanel" element={<Home />} />
      <Route path="/inventoryPanel/addItems" element={<AddItems />} />
      <Route path="/inventoryPanel/item/:id" element={<UpdateItemPage />} />
    </Route>
  )
)

function App() {
  return (

    <RouterProvider router={router}/>

  );
}

export default App;
