import PinkStarryBackground from "../components/backgrounds/PinkStarryBackground";
import Navbar from "../components/navbars/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PinkStarryBackground>
            <Navbar activeOption="cosplay" />
            {children}
        </PinkStarryBackground>
    )
}