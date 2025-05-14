import React,{ useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Sidebar from "./components/Sidebar";
import './index.css'

const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const ChannelPage = lazy(() => import("./pages/ChannelPage"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer"));
const CreateChannelPage = lazy(() => import("./pages/CreateChannelPage"));
const UploadVideoPage = lazy(() => import("./pages/UploadVideoPage"));
const UpdateVideoPage = lazy(() => import("./pages/UpdateVideoPage"));
const HistoryPage = lazy(() => import("./pages/History"));

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 m-2">
          <Suspense
            fallback={<div className="text-center p-4">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/channel" element={<ChannelPage />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/upload" element={<UploadVideoPage />} />
              <Route path="/updateVideo/:id" element={<UpdateVideoPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/create" element={<CreateChannelPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;