import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import Dashboard from "./pages/dashboard/dashboard";
import Inbox from "./pages/inbox/inbox";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </div>
  );
}
