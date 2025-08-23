import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TrainAnimation.css";

export default function TrainAnimation() {
  const trainRef = useRef(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const train = trainRef.current;
    if (!train) return;

    // slide-in animation
    let pos = -train.offsetWidth;
    const stop = window.innerWidth;
    const speed = 3;
    let raf;
    const step = () => {
      if (pos + train.offsetWidth < stop) {
        pos += speed;
        train.style.left = `${pos}px`;
        raf = requestAnimationFrame(step);
      } else {
        setReady(true);
        train.style.cursor = "grab";
      }
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const train = trainRef.current;
    if (!train) return;

    let dragging = false, startX = 0, startLeft = 0;

    const onDown = (e) => {
      dragging = true;
      startX = e.clientX;
      startLeft = parseInt(getComputedStyle(train).left || "0", 10);
      train.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!dragging) return;
      train.style.left = `${startLeft + (e.clientX - startX)}px`;
    };
    const onUp = () => {
      dragging = false;
      train.style.cursor = "grab";
    };

    train.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      train.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [ready]);

  const goDustbin = (coach) => navigate(`/dustbin1?coach=${encodeURIComponent(coach)}`);

  return (
    <div className="scene">
      <div className="track" />
      <div className="stationLabel">Pune Junction</div>

      <div className="train" ref={trainRef}>
        {/* coaches */}
        <div className="coach" onClick={() => goDustbin("A3")}><img src="/images/coach5-removebg-preview.png" alt="A3" /></div>
        <div className="coach" onClick={() => goDustbin("A2")}><img src="/images/coach5-removebg-preview.png" alt="A2" /></div>
        <div className="coach" onClick={() => goDustbin("A1")}><img src="/images/coach4-removebg-preview.png" alt="A1" /></div>
        <div className="coach" onClick={() => goDustbin("S2")}><img src="/images/coach3-removebg-preview.png" alt="S2" /></div>
        <div className="coach" onClick={() => goDustbin("S1")}><img src="/images/coach2-removebg-preview.png" alt="S1" /></div>
        <div className="coach" onClick={() => goDustbin("GEN")}><img src="/images/coach1-removebg-preview.png" alt="GEN" /></div>
        {/* engine */}
        <div className="engine"><img src="/images/train.png" alt="Engine" /></div>
      </div>

      <div className="cardStation">
        <img src="/images/train-logo.png" className="logo" alt="" />
        <h3>Pune Junction</h3>
        <div className="infoRow">
          <span>Platform 3</span>
          <span><img src="/images/clock-icon.png" alt="" style={{ width:18, marginRight:5 }} />8 min</span>
        </div>
        <div className="timeInfo">
          <span>Arrival 2:15 PM</span>
          <span>Departure 2:23 PM</span>
        </div>
      </div>
    </div>
  );
}
