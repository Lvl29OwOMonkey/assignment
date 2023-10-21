import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import PopulatedNavBar from "../components/PopulatedNavBar";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
	return (
		<main>
			<PopulatedNavBar />
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;
