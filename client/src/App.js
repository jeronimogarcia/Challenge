import ComponentTitle from "./components/ComponentTitle";
import Header from "./components/Header";
import UsersFetch from "./components/UsersFetch";
import "./index.css"

function App() {
  return (
    <div className="bg-[#F9F9F9] absolute top-0 bot-0 right-0 left-0 max-w-[75%] m-auto h-[100%] w-[100%]">
      <Header />
      <ComponentTitle title='Lista de Usuarios'/>
      <UsersFetch/>
    </div>
  );
}

export default App;
