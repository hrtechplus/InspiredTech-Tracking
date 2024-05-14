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
import NotificationPage from './inventoryControl/pages/Notification';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/inventoryPanel" element={<Home />} />
      <Route path="/inventoryPanel/addItems" element={<AddItems />} />
      <Route path="/inventoryPanel/item/:id" element={<UpdateItemPage />} />
      <Route path='/inventoryPanel/notification' element={<NotificationPage />} />
    </Route>
  )
)

function App() {
  return (

    <RouterProvider router={router}/>

  );
}

export default App;
