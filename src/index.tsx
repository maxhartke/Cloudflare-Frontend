import ReactDOM from "react-dom";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import App from "./App";

ReactDOM.render(
	<AppProvider
		i18n={enTranslations}
		theme={{
			colors: {
				surface: "#111213",
				onSurface: "#111213",
				interactive: "#2e72d2",
				secondary: "#111213",
				primary: "#3b5998",
				critical: "#d82c0d",
				warning: "#ffc453",
				highlight: "#5bcdda",
				success: "#008060",
				decorative: "#ffc96b",
			},
		}}
	>
		<App />
	</AppProvider>,
	document.getElementById("root")
);
