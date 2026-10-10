import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "http://localhost:3000";

const operationsMap = {
  ADD: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
} as const;

type Operations = (typeof operationsMap)[keyof typeof operationsMap];

const keys = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "DEL",
  "+",
  "Equal",
  "ANS",
  "AC",
];
function App() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [arthmeticExpression, setArthmeticExpression] = useState("");
  const [display, setDisplay] = useState("");
  useEffect(() => {
    setArthmeticExpression("");
    setResult("");
    setStatus("idle");
  }, []);

  useEffect(() => {
    setDisplay(arthmeticExpression);
  }, [arthmeticExpression]);
  useEffect(() => {
    setDisplay(errorMessage);
  }, [errorMessage]);
  function isOperator(key: any): key is Operations {
    return Object.values(operationsMap).includes(key);
  }
  function handleDelete() {
    setArthmeticExpression(arthmeticExpression.slice(0, -1));
  }

  function handleAC() {
    setArthmeticExpression("");
  }
  function handleArthmeticExpression(key: string) {
    if (key === "Equal") {
      const [inputX, operator, inputY] =
        arthmeticExpression.split(/([\+\-\/\*])/);
      calculate(inputX, inputY, operator as Operations);
    } else if (key === "DEL") {
      handleDelete();
    } else if (key === "ANS") {
      if (!isOperator(arthmeticExpression[arthmeticExpression.length - 1]))
        setArthmeticExpression(result);
      else
        setArthmeticExpression(arthmeticExpression + result.toString().trim());
    } else if (key === "AC") {
      handleAC();
    } else if (isOperator(key)) {
      if (
        arthmeticExpression.length === 0 ||
        isOperator(arthmeticExpression[arthmeticExpression.length - 1])
      )
        return;
      setArthmeticExpression(arthmeticExpression + key);
    } else {
      if (status === "fulfilled" && (!isNaN(Number(key)) || key === ".")) {
        setArthmeticExpression(key);
      } else setArthmeticExpression(arthmeticExpression + key);
    }
    setStatus("idle");
  }
  async function calculate(
    inputX: string,
    inputY: string,
    operator: Operations,
  ) {
    try {
      setStatus("pending");
      const response = await axios.post(`${BASE_URL}/calculator/calculate`, {
        num1: inputX === "" ? null : Number(inputX),
        num2: inputY === "" ? null : Number(inputY),
        operator: operator,
      });
      setStatus("fulfilled");
      setArthmeticExpression(response.data.result.toString());
      setResult(response.data.result);
      setDisplay(response.data.result);
    } catch (err: any) {
      setStatus("rejected");
      setErrorMessage(
        !err.response.data?.errors ? "Missing data" : err.response.data.message,
      );
      setResult("");

      setArthmeticExpression("");
    }
  }

  // let message = "";
  // if (status === "fulfilled") message = result;
  // else if (status === "idle") message = arthmeticExpression;
  // else if (status === "rejected") message = errorMessage;
  // else message = "Calculating...";
  return (
    <div className="bg-gray-100 flex justify-center items-center w-full h-full">
      <div className="min-w-[320px] w-1/4 bg-gray-300 p-4 rounded-2xl">
        {/* Inner structure */}
        <div className="h-full ">
          {/* Result screen */}
          <div
            className={`rounded-md h-14 bg-white flex items-center px-4 ${status === "rejected" && "text-red-600"}`}
          >
            {display}
          </div>
          <div className="grid grid-cols-[repeat(4,1fr)] gap-1 py-2 ">
            {keys.map((key) => {
              return (
                <div
                  key={key}
                  className={`rounded-md cursor-pointer p-4 flex justify-center text-white font-medium ${key === "Equal" ? "col-span-2 bg-black" : "bg-gray-600"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleArthmeticExpression(key);
                  }}
                >
                  {key}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
