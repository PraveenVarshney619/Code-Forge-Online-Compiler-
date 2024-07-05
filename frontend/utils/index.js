// utils/codeUtils.js
import { defineTheme } from "../lib/defineTheme";
export const handleSubmit = async ( setError, sendCode, code, language, setOutput, socket, room, customInput, toast) => {
  setError(false);
    if(!code || !language){
      setError(true)
      return
    }
    const response = await sendCode(code, language, customInput);
    setOutput(response);
    if (socket) {
      socket.emit('codeUpdate', { code, room });
    }
    
      toast.success(`Code Compiled`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
};

export const handleThemeChange = (th, setTheme) => {
  const theme = th;
  //console.log('theme...', theme);

  if (['light', 'vs-dark'].includes(theme.value)) {
    setTheme(theme);
  } else if (theme.value) {
    defineTheme(theme.value).then((_) => setTheme(theme));
  }else{
    setTheme('oceanic-next')
  }
};

export const onSelectChange = (sl, setLanguage, setCode, language) => {
  //console.log('selected Option...', sl);
  // if(!language){
  //   setLanguage(sl);
  //   setCode(sl.code);
  // }
  // else if(language.value === sl.value){
  //   setLanguage(sl);
  // }
  // else{
  setLanguage(sl);
  setCode(sl.code);
  
  // console.log(sl)
  
   
  // console.log(language) 
};

export const onChange = (action, data, setCode, setCookie, socket, room) => {
  switch (action) {
    case 'code': {
      setCode(data);
      setCookie('code',data, { path: '/', maxAge: 24 * 60 * 60 });
      if (socket) {
        socket.emit('codeUpdate', { code: data, room });
      }
      break;
    }
    default: {
      console.warn('case not handled!', action, data);
    }
  }
};

export const classnames = (...args) => {
  return args.join(" ");
};
