import io from "socket.io-client";

const API = "http://localhost:3000";

export const sendCode = async (Code, Language, customInput) => {
  const formData = {
    Code: Code,
    Language: Language.id,
    Input: customInput,
  };
  const response = await fetch(`${API}/api/compile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  //console.log(result)
  return result;
};
export const getScrapeData = async(url)=>{
  const formData = {
    url: url
  }

  const response = await fetch(`${API}/api/scrape`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  const result = await response.text();
  //console.log(result)
  return result;
}
export const initializeWebSocket = (socket, setSocket, room, code, toast) => {
  if (socket) {
    socket.disconnect();
  }
  const newSocket = io("http://localhost:3000", {
    query: { room },
  });

  newSocket.on("connect", () => {
    //console.log('WebSocket connected:', newSocket.id);
    setSocket(newSocket);

    if (room) {
      newSocket.emit("joinRoom", { room });
      newSocket.emit("codeUpdate", { code, room });
    }
  });

  newSocket.on("disconnect", () => {
    //console.log('WebSocket disconnected');
    setSocket(null);
  });
  if (room) {
    toast.success(`Entered room: ${room}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
