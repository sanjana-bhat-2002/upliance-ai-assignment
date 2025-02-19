import Form from "@/components/Form";
import "./App.css";
import Counter from "./components/Counter";
import RichTextEditor from "@/components/RichTextEditor";

function App() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex justify-between items-center gap-24 w-full">
          <Counter />

          <RichTextEditor />
        </div>
        <br />
        <br />
        <br />
        <div className="flex justify-center items-center gap-24 w-full my-8">
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;
