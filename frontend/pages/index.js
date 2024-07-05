import React, { useState, useEffect } from "react";
import { Header, FileEditor, Output, Scrapper, Input } from "../components";
import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";
import { sendCode, initializeWebSocket } from "../services";
import { useCookies } from "react-cookie";
import {
  handleSubmit,
  handleThemeChange,
  onSelectChange,
  onChange,
} from "../utils";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [cookies, setCookie] = useCookies(["code"]);
  const [code, setCode] = useState(languageOptions[0].code);
  const [output, setOutput] = useState();
  const [language, setLanguage] = useState(languageOptions[0]);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState("oceanic-next");
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [customInput, setCustomInput] = useState("");
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  useEffect(() => {
    const storedCode = cookies.code;
    if (storedCode) {
      setCode(storedCode);
    }
    if (socket) {
      socket.on("codeUpdate", ({ code: updatedCode, sender }) => {
        console.log(`Received code update from ${sender}:`, updatedCode);
        setCode(updatedCode);
      });

      socket.on("InitializeCode", (data) => {
        console.log(
          `Received code initialization request from ${data.requester}`
        );
        try {
          const currentCode = cookies.code;
          socket.emit("codeUpdate", { code: currentCode, sender: socket.id });
        } catch (error) {
          console.error("Error getting or sending code:", error);
        }
      });
    }
  }, [cookies.code, socket]);

  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header
        onSelectChange={(sl) =>
          onSelectChange(sl, setLanguage, setCode, language)
        }
        handleThemeChange={(th) => handleThemeChange(th, setTheme)}
        theme={theme}
        handleSubmit={() =>
          handleSubmit(
            setError,
            sendCode,
            code,
            language,
            setOutput,
            socket,
            room,
            customInput,
            toast
          )
        }
        initializeWebSocket={() =>
          initializeWebSocket(socket, setSocket, room, code, toast)
        }
        room={room}
        setRoom={setRoom}
      />
      <div className="grid grid-cols-2 lg:grid-cols-2 ">
        <Scrapper />
        <div className=" lg:col-span-1 mx-3 my-3 rounded mr-2 bg-[#2c3e50] ">
          <div className="top-5 lg:my-2 lg:mx-5">
            <FileEditor
              code={code}
              language={language?.value}
              theme={theme.value}
              onChange={(action, data) =>
                onChange(
                  action,
                  data,
                  setCode,
                  setCookie,
                  socket,
                  room,
                  language
                )
              }
            />
            <div className="grid grid-cols-2">
              <Output output={output} />
              <Input
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
