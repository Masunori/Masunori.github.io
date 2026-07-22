export default function BlankBackground({  children}: { children: React.ReactNode }) {
    return (
        <div style={{ backgroundColor: "var(--background)", width: "100vw", height: "100vh" }}>
            {children}
        </div>
    );
}