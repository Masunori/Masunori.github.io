"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "./components/navbars/Navbar";
import StarryBackground from "./components/backgrounds/StarryBackground";

export default function Home() {
	const router = useRouter();

	return (
		<StarryBackground>
			<div className={styles.page}>
				<Navbar activeOption="home" />
				<main>
					<h1>Welcome to Nori's blog!</h1>
					<section className={styles.bio}>
						<h2>About Me</h2>
						<ul>
							<li>
								<p>Vietnamese, studying in Singapore</p>
							</li>
							<li>
								<p>National University of Singapore, Computer Science - AI Focus Area</p>
							</li>
							<li>
								<p>The University of Melbourne, Exchange Student</p>
							</li>
						</ul>
					</section>
					<section className={styles.professionalContacts}>
						<h2>Professional Contacts</h2>
						<table>
							<colgroup>
								<col style={{ width: "30%" }} />
								<col style={{ width: "70%" }} />
							</colgroup>
							<tbody>
								<tr>
									<td>Mobile (Singapore)</td>
									<td>+65 8456 1706</td>
								</tr>
								<tr>
									<td>Mobile (Vietnam)</td>
									<td>+84 915 535 986</td>
								</tr>
								<tr>
									<td>Email</td>
									<td><a href="mailto:minhducduong128@gmail.com">minhducduong128@gmail.com</a></td>
								</tr>
								<tr>
									<td>GitHub</td>
									<td><a href="https://github.com/Masunori" target="_blank" rel="noopener noreferrer">https://github.com/Masunori</a></td>
								</tr>
								<tr>
									<td>LinkedIn</td>
									<td><a href="http://www.linkedin.com/in/duong-minh-duc-9a85a2317" target="_blank" rel="noopener noreferrer">http://www.linkedin.com/in/duong-minh-duc-9a85a2317</a></td>
								</tr>
							</tbody>
						</table>
					</section>
					<section className={styles.socialMediaLinks}>
						<h2>Social Media Links</h2>
						<table>
							<colgroup>
								<col style={{ width: "30%" }} />
								<col style={{ width: "70%" }} />
							</colgroup>
							<tbody>
								<tr>
									<td>Facebook</td>
									<td><a href="https://www.facebook.com/minhduc.duong.125323" target="_blank" rel="noopener noreferrer">https://www.facebook.com/minhduc.duong.125323</a></td>
								</tr>
								<tr>
									<td>Instagram</td>
									<td><a href="https://www.instagram.com/dmd.128/" target="_blank" rel="noopener noreferrer">https://www.instagram.com/dmd.128/</a></td>
								</tr>
							</tbody>
						</table>
					</section>
				</main>
			</div>
		</StarryBackground>
	);
}
