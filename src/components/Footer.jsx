import '../styles/Footer.css'

export default function Footer() {
    return (
        <div className="footer">
            <p>Designed by SE © {new Date().getFullYear()}</p>
        </div>
    )
}