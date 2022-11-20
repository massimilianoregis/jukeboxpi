export const useSay = () => {    
    const speak = (text:string|null) => {
      if(!text) return;
      const utterance:any = new SpeechSynthesisUtterance(text);
      //utterance.voice = "veena";
      utterance.pitch = 1;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }    

    
    return ({
      say:speak,
    });
  }