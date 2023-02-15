import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import User from "./components/Auth/User";
import Community from "./components/Community/Community";
import CommunityWrite from "./components/Community/CommunityWrite";
import PostDetail from "./components/Community/PostDetail";
import Footer from "./components/Footer";
import Main from "./components/MainPage/Main";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile";
import Etc from "./components/Ranking/Ranking";
import MovieDetail from "./components/RoutePage/MovieDetail";
import Search from "./components/Search/Search";
import Ranking from "./components/Ranking/Ranking";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="drawer-content">
        <section className="flex min-h-16 fixed z-10 w-full p-2 shadow-lg bg-cine-navy">
          <NavBar />
        </section>
        <section className="main pt-16">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movieDetail/:movie_id" element={<MovieDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/write" element={<CommunityWrite />} />
            <Route path="/postDetail/:post_id" element={<PostDetail />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/user" element={<User />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </section>
        <Footer />
      </section>
    </QueryClientProvider>
  );
}

export default App;
