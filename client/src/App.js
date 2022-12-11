import ComponentTitle from "./components/ComponentTitle";
import Header from "./components/Header";
import UsersFetch from "./components/UsersFetch";
import "./index.css"

function App() {
  return (
    <div className="bg-[#F9F9F9] relative max-w-[75%] m-auto h-[100vh]">
      <Header />
      <ComponentTitle title='Lista de Usuarios'/>
      <UsersFetch/>
    </div>
  );
}

export default App;
