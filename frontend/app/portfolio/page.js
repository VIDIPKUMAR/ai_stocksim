import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Portfolio(){

    return(<>
    <Navbar/>
    <div className="portfolio">
        <div className="header-p">
            <h1>Simulated Portfolio</h1>
            <div>Login</div>
        </div>
        <div className="profile">
            <h2>User Information</h2>
            <h3>Name: John Doe</h3>
            <h3>Email: john.doe@example.com</h3>
        </div>
        <div className="simulatedstuff">
            <div className="stats">
                <h2>Simulated Trade Statistics</h2>
                <h4>Open Trades:5</h4>
                <h4>Closed Trades:10</h4>
                <h4>Profitable Trades:8</h4>
                <h4>Loss Trades:7</h4>
            </div>
            <div className="summary">
                <h2>Simulated Financial Summary</h2>
                <h4>Total Profit/Loss:$1500</h4>
                <h4>Total Spent:$10000</h4>
                <h4>Overall Outcome:$11500</h4>
            </div>
        </div>
    </div>
    <Footer/>
    </>);
}