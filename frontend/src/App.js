import AdminLogin from "./trackingComponent/admin/AdminLogin";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <AdminLogin />
      <Toaster />
    </div>
  );
}

export default App;
