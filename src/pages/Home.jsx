import { Link } from "react-router-dom";

const trains = [
  { name:"Rajdhani Express", platform:"1", halt:"5 min", arr:"12:00 PM", dep:"12:05 PM" },
  { name:"Pune Junction", url:"/train", platform:"3", halt:"8 min", arr:"2:15 PM", dep:"2:23 PM" },
  { name:"Garib Rath", platform:"2", halt:"10 min", arr:"4:40 PM", dep:"4:50 PM" },
  { name:"Duronto Express", platform:"5", halt:"15 min", arr:"6:30 AM", dep:"6:45 AM" },
  { name:"Jan Shatabdi", platform:"4", halt:"7 min", arr:"9:50 AM", dep:"9:57 AM" },
  { name:"Vande Bharat Express", platform:"6", halt:"2 min", arr:"11:00 AM", dep:"11:02 AM" },
  { name:"Intercity Express", platform:"7", halt:"5 min", arr:"3:20 PM", dep:"3:25 PM" },
  { name:"Shatabdi Express", platform:"3", halt:"8 min", arr:"2:15 PM", dep:"2:23 PM" },
  { name:"Express Cargo", platform:"8", halt:"20 min", arr:"1:00 AM", dep:"1:20 AM" },
];

export default function Home() {
  return (
    <>
      <header className="nav">
        <Link to="/" className="logo">SMART<span>RAILWAYS.</span></Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#train-info">Train Info</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </header>

      <section className="hero">
        <div className="heroContent">
          <h1>Welcome to Indian Railways</h1>
          <p>SMART WASTE MANAGEMENT FOR RAILWAY COMPARTMENT WITH AUTOMATED SEGREGATION AND NOTIFICATION.</p>
        </div>
      </section>

      <h2 id="train-info" className="stationTitle">Pune Junction</h2>

      <section className="stationGrid">
        {trains.map((t, i) => {
          const body = (
            <>
              <img src="/images/train-logo.png" alt="" className="cardLogo" />
              <h3 style={{margin:0, fontSize:22, textTransform:"uppercase"}}>{t.name}</h3>
              <div className="infoRow">
                <span>Platform: {t.platform}</span>
                <span>Halt Time: <img src="/images/clock-icon.png" alt="" /> {t.halt}</span>
              </div>
              <div className="timeInfo">
                <span>Arrival: {t.arr}</span>
                <span>Departure: {t.dep}</span>
              </div>
            </>
          );
          return (
            <div key={i} className="card">
              {t.url ? <Link to={t.url} style={{display:"block", color:"inherit"}}>{body}</Link> : body}
            </div>
          );
        })}
      </section>

      <footer id="contact">
        <section style={{padding:"10px"}}>
          <h2>Contact Us</h2>
          <p>Email: support@indianrailways.gov.in</p>
          <p>Phone: 139</p>
        </section>
        <p>© 2025 Indian Railways. All rights reserved.</p>
      </footer>
    </>
  );
}
