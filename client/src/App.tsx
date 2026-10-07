import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorModal } from "./components/ErrorModal";
import "./App.css";

const BASE_URL = "http://localhost:3000";

type Operations = "+" | "-" | "*" | "/";
function App() {
  const [caluclatorForm, setCaluclatorForm] = useState({
    inputX: "",
    inputY: "",
  });

  const [result, setResult] = useState("");
  const [status, setStatus] = useState("ideal");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setCaluclatorForm({ inputX: "", inputY: "" });
    setResult("");
    setStatus("idle");
  }, []);

  useEffect(() => {}, [status]);
  async function calculate(operator: Operations) {
    try {
      setStatus("pending");

      if (caluclatorForm.inputX.trim() == "" || caluclatorForm.inputY.trim()) {
      }
      const response = await axios.post(`${BASE_URL}/calculator/calculate`, {
        num1: parseInt(caluclatorForm.inputX),
        num2: parseInt(caluclatorForm.inputY),
        operator: operator,
      });
      setStatus("fulfilled");
      setResult(response.data.result);
    } catch (err: any) {
      setStatus("rejected");
      console.log(err.response.data);
      setErrorMessage(
        err.response.data?.errors ? "Missing data" : err.response.data.message,
      );
      setResult("");
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center w-full h-full">
      {status === "rejected" && (
        <ErrorModal message={`${errorMessage}`}></ErrorModal>
      )}
      <div className="bg-gray-200 flex flex-col p-4 py-5 rounded-2xl w-1/4">
        <p className="m-auto mb-5 font-bold">Calculator</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <label htmlFor="">Number 1:</label>
            <input
              className="bg-white px-1"
              value={caluclatorForm.inputX}
              required
              onChange={(e) =>
                setCaluclatorForm({ ...caluclatorForm, inputX: e.target.value })
              }
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="">Number 2:</label>
            <input
              className="bg-white px-1"
              value={caluclatorForm.inputY}
              required
              onChange={(e) =>
                setCaluclatorForm({ ...caluclatorForm, inputY: e.target.value })
              }
            ></input>
          </div>
        </div>
        <br />
        <div className="flex justify-evenly">
          <button
            className="bg-blue-400 px-8 py-4 text-4xl text-white rounded-sm cursor-pointer"
            onClick={() => calculate("+")}
          >
            +
          </button>
          <button
            className="bg-blue-400 px-8 py-4 text-4xl text-white rounded-sm cursor-pointer"
            onClick={() => calculate("-")}
          >
            -
          </button>
          <button
            className="bg-blue-400 px-8 py-4 text-4xl text-white rounded-sm cursor-pointer"
            onClick={() => calculate("*")}
          >
            *
          </button>
          <button
            className="bg-blue-400 px-8 py-4 text-4xl text-white rounded-sm cursor-pointer"
            onClick={() => calculate("/")}
          >
            /
          </button>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <p>Result: </p>

          <div className="bg-white w-32 text-green-600 px-1">
            {status == "pending" ? "Calculating..." : result}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
