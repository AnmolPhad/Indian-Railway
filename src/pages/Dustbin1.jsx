import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Dustbin1.css";

// Firebase compat (closest to your original)
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Chart.js setup
import {
  Chart, ArcElement, DoughnutController, BarController,
  BarElement, CategoryScale, LinearScale, Legend, Tooltip
} from "chart.js";
Chart.register(ArcElement, DoughnutController, BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// ---- Firebase config (from your html) ----
const firebaseConfig = {
  apiKey:"AIzaSyAWTlzCxwtxBIcUEpJxJ0tOP1WYCmqGa-8",
  authDomain:"signin-example-46de3.firebaseapp.com",
  projectId:"signin-example-46de3",
  storageBucket:"signin-example-46de3.appspot.com",
  messagingSenderId:"294157929830",
  appId:"1:294157929830:web:3ba79d8ccf2fb5c81d8ca7"
};

let app;
function ensureFirebase() {
  if (!firebase.apps.length) app = firebase.initializeApp(firebaseConfig);
  return firebase.firestore();
}

const clamp = (v) => Math.min(100, Math.max(0, Number(v) || 0));

export default function Dustbin1() {
  const params = new URLSearchParams(location.search);
  const coach = params.get("coach") || "";
  const [dry, setDry] = useState("--");
  const [wet, setWet] = useState("--");
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const donutInst = useRef(null);
  const barInst = useRef(null);
  const [toast, setToast] = useState("");

  const dryPct = typeof dry === "number" ? dry : 0;
  const wetPct = typeof wet === "number" ? wet : 0;

  // fetch data
  const fetchData = async () => {
    if (coach !== "S1") {
      setDry("--"); setWet("--");
      destroyCharts();
      showToast("Data available only for Coach S1");
      return;
    }
    try {
      const db = ensureFirebase();
      const snap = await db.collection("SensorData").doc("DHT22").get();
      if (!snap.exists) throw new Error("No data document");
      const d = snap.data();
      const dryV = clamp(d.dry ?? d.DRY ?? 0);
      const wetV = clamp(d.wet ?? d.WET ?? 0);
      setDry(dryV); setWet(wetV);
      drawCharts(dryV, wetV);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch data");
    }
  };

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  }

  function destroyCharts() {
    donutInst.current?.destroy();
    donutInst.current = null;
    barInst.current?.destroy();
    barInst.current = null;
  }

  function drawCharts(dryV, wetV) {
    destroyCharts();

    // Doughnut Chart
    donutInst.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: { 
        labels:["Wet","Dry"], 
        datasets:[{ 
          data:[wetV, dryV],
          backgroundColor: ["#4caf50", "#ff9800"]  // Wet = Green, Dry = Orange
        }] 
      },
      options: { cutout: "70%", plugins:{ legend:{ position:"bottom" } } }
    });

    // Bar Chart
    barInst.current = new Chart(barRef.current, {
      type: "bar",
      data: { 
        labels:["Dry","Wet"], 
        datasets:[{ 
          label:"Levels", 
          data:[dryV, wetV],
          backgroundColor: ["#ff9800", "#4caf50"] // Dry = Orange, Wet = Green
        }] 
      },
      options: { 
        scales:{ 
          y:{ beginAtZero:true, max:100, ticks:{ callback:v => v + "%" } } 
        }, 
        plugins:{ legend:{ display:false } } 
      }
    });
  }

  useEffect(() => {
    fetchData(); const t = setInterval(fetchData, 10000); return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coach]);

  return (
    <div className="page">
      <div className="head">
        Smart Waste Management
        <div className="coach">Coach: {coach || "--"}</div>
      </div>

      {toast && <div className="toast" style={{display:"block"}}>{toast}</div>}

      <div className="wrapper">
        <div className="card">
          <h2>Dry Waste</h2>
          <p>{typeof dry === "number" ? `${dry}%` : "--%"}</p>
          <div className="bucket"><div className="fill" style={{height: typeof dry === "number" ? `${dry}%` : "0%"}}/></div>
        </div>
        <div className="card">
          <h2>Wet Waste</h2>
          <p>{typeof wet === "number" ? `${wet}%` : "--%"}</p>
          <div className="bucket"><div className="fill" style={{height: typeof wet === "number" ? `${wet}%` : "0%"}}/></div>
        </div>
      </div>

      <button className="btn" onClick={fetchData}>Refresh Data</button>

      <div className="chartWrap">
        <h2>Waste Segregation Comparison</h2>
        <div className="row">
          <canvas ref={donutRef} />
          <canvas ref={barRef} />
        </div>
      </div>

      <div className="tsRow">
        <div className="chartWrap">
          <h2>ThingSpeak – Dry Waste</h2>
          <iframe
            className="iframe"
            src="https://thingspeak.com/channels/2801555/charts/2?api_key=1O1U8FY02X7YI09X&bgcolor=%23ffffff&color=%23d14cc0&dynamic=true&results=120&type=line&update=15"
            title="ThingSpeak Dry" />
        </div>
        <div className="chartWrap">
          <h2>ThingSpeak – Wet Waste</h2>
          <iframe
            className="iframe"
            src="https://thingspeak.com/channels/2801555/charts/1?api_key=1O1U8FY02X7YI09X&bgcolor=%23ffffff&color=%238b63e5&dynamic=true&results=120&type=line&update=15"
            title="ThingSpeak Wet" />
        </div>
      </div>
    </div>
  );
}
