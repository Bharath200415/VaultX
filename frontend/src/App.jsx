import Navbar from "./components/Navbar";
import Dashboard from "./pages/DashBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard />
    </div>
  );
}