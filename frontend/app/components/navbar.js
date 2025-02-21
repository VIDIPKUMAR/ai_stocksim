import Link from "next/link";

export default function Navbar(){

    return(<>
    <div>
        <div>
            StockSim
        </div>
        <div>
            <Link href="/">Home</Link>
            <Link href="/stock">Stock</Link>
            <Link href="/portfolio">Portfolio</Link>
        </div>
    </div>
    </>);
}