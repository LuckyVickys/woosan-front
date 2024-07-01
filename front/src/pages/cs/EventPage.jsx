import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import coinImage from '../../assets/image/coin3.png';
import polygonImage from '../../assets/image/Polygon 2.png';
import axios from 'axios';

const EventPage = () => {

  const location = useLocation();

  let sub = "";
  let info = "";

  switch (location.pathname) {
    case '/cs/':
      sub = "공지사항";
      info = "우리는 함께 산다에서 알려드립니다."
      break;
    case '/cs/event/':
      sub = "이벤트";
      info = "포인트를 받을 수 있는 기회!"
      break;
    default:
      sub = "공지사항";
      info = "우리는 함께 산다에서 알려드립니다."
      break;
  }

  const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const [products, setProducts] = useState([
      { name: "Point", additionalText: "5P" },
      { name: "Point", additionalText: "10P" },
      { name: "Point", additionalText: "20P" },
      { name: "Point", additionalText: "30P" },
      { name: "Point", additionalText: "50P" },
      { name: "Point", additionalText: "100P" }
    ]);
    const [selectedPoint, setSelectedPoint] = useState(null); // 선택된 포인트 상태 추가

    useEffect(() => {
      const $c = canvasRef.current;
      const ctx = $c.getContext('2d');
      const img = new Image();
      img.src = coinImage;

      img.onload = () => {
        const newMake = () => {
          const [cw, ch] = [$c.width / 2, $c.height / 2];
          const radius = Math.min(cw, ch) - 10;
          const arc = Math.PI / (products.length / 2);

          ctx.clearRect(0, 0, $c.width, $c.height);

          for (let i = 0; i < products.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = (i % 2 === 0) ? '#41B06E' : '#FFF5E0';
            ctx.moveTo(cw, ch);
            ctx.arc(cw, ch, radius, arc * (i - 1), arc * i);
            ctx.fill();
            ctx.closePath();
          }

          ctx.beginPath();
          ctx.arc(cw, ch, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = '#141E46';
          ctx.lineWidth = 12;
          ctx.stroke();
          ctx.closePath();

          ctx.font = "13px Pretendard";
          ctx.textAlign = "center";
          for (let i = 0; i < products.length; i++) {
            const angle = (arc * i) + (arc / 2);
            ctx.save();
            ctx.translate(
              cw + Math.cos(angle) * (radius - 50),
              ch + Math.sin(angle) * (radius - 50)
            );
            ctx.rotate(angle + Math.PI / 2);

            ctx.drawImage(img, -15, -35, 30, 30);

            ctx.fillStyle = (i % 2 === 0) ? '#141E46' : '#FFF5E0';
            ctx.fillText(products[i].name, 0, 30);
            ctx.fillText(products[i].additionalText, 0, 10);
            ctx.restore();
          }
        };

        newMake();
      };
    }, [products]);

    const handleInputChange = (index, key, value) => {
      const newProducts = [...products];
      newProducts[index][key] = value;
      setProducts(newProducts);
    };

    const rotate = () => {
      const $c = canvasRef.current;
      $c.style.transform = `initial`;
      $c.style.transition = `initial`;
      const alpha = Math.floor(Math.random() * 100);
      setTimeout(() => {
        const ran = Math.floor(Math.random() * products.length);
        const arc = 360 / products.length;
        const rotate = (ran * arc) + 3600 + (arc * 3) - (arc / 4) + alpha;
        $c.style.transform = `rotate(-${rotate}deg)`;
        $c.style.transition = `2s`;

        // 선택된 포인트 계산 및 상태 저장
        const selectedIndex = (products.length - 1) - ran;
        const selectedProduct = products[selectedIndex];
        const pointValue = parseInt(selectedProduct.additionalText.replace(/[^0-9]/g, '')); // 숫자만 추출하여 정수로 변환
        setSelectedPoint(selectedProduct.additionalText);

        // 서버로 포인트 전송
        axios.post('http://localhost:7777/api/roulette/updatePoints',
          {
            memberId: 1,
            point: 50
          })
          .then(response => {
            console.log('Point sent to server:', response.data);
          })
          .catch(error => {
            console.error('Error sending point to server:', error);
          });
      });
    };

    return (
      <div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', top: '250px' }}>
          <div style={{ position: 'relative' }}>
            <img src={polygonImage} alt="Polygon2.png" style={{ width: '15px', height: '20px', position: 'absolute', left: '50%', top: '-15px', transform: 'translateX(-50%)' }} />
            <canvas ref={canvasRef} width={300} height={300} style={{ display: 'block' }}></canvas>
            <button
              onClick={rotate}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                backgroundColor: '#FEFFB7',
                color: '#000000',
                border: '1px solid #141E46',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >START!</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="content">
      <CanvasComponent />
    </div>
  );
}

export default EventPage;
