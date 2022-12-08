import ComponentTitle from "./components/ComponentTitle";
import Header from "./components/Header";
import UsersTable from "./components/UsersTable";
import "./index.css"

function App() {
  return (
    <div className="bg-[#F9F9F9] relative max-w-[75%] m-auto h-[100vh]">
      <Header />
      <ComponentTitle title='Lista de Usuarios'/>
      <UsersTable/>
    </div>
  );
}

export default App;
