import Navbar from "./components/navbar";
import Footer from "./components/footer";
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="home">
     <div className="title">
      <h1>Welcome to StockSim</h1>
      <h4>Your risk-free platform for simulating stock trading and honing your investment skills</h4>
     </div>
     <div className="cards">
      <div className="ourpurpose">
          <h2>Our Purpose</h2>
          <p>StockSim aims to provide a realistic stock trading simulation environment where users can practice investing strategies without risking real money. Perfect for beginners and experienced traders alike.</p>
      </div>
      <div className="keyfeatures">
          <h2>Key Features</h2>
          <ul>
            <li>Real-time stock data simulation</li>
            <li>Risk-free trading environment</li>
            <li>AI-powered insights for learning</li>
            <li>Portfolio management tools</li>
            <li>Global leaderboard for competitive learning</li>
          </ul>
      </div>
     </div>
     <div className="contact">
      <h2>Contact the Developers</h2>
      <h5>Email: francisamal030@gmail.com</h5>
      <h5>Phone: (91) 9363032004</h5>
     </div>
     <div>
      Start Simulating now
     </div>
    </div>
    <Footer/>
    </>
  );
}
