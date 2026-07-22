import StarryBackground from "../components/backgrounds/StarryBackground";
import Navbar from "../components/navbars/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <StarryBackground>
            <Navbar activeOption="projects" />
            {children}
        </StarryBackground>
    )
}