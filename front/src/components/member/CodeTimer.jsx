import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CodeTimer = ({ timerActive, resetTimer,  setShowCode }) => {
    const [count, setCount] = useState(300);

    useEffect(() => {
        let interval;
    
        if (timerActive) {
          interval = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount === 0) {
                handleTimeUp();
                return 0;
              } else {
                return prevCount - 1;
              }
            });
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [timerActive]);
    
      useEffect(() => {
        if (!timerActive) {
          setCount(300);
        }
      }, [timerActive]);
    
      const handleTimeUp = () => {
        Swal.fire("인증 실패", `시간이 만료되었습니다.`, "error");
        resetTimer();
        setShowCode(false);
      };
    
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
    
      return (
        <span className="codeTimer">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    };
    
export default CodeTimer;