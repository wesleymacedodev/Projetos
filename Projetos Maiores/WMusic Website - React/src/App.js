import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Layout>
      <Navbar/>
      <Home/>
      <Footer/>
      </Layout>
    </div>
  );
}

export default App;
