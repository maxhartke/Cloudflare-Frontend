import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "./Feed";
import CreatePost from "./CreatePost";

export default function App(this: any) {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Feed />
				</Route>
				<Route path="/create-post">
					<CreatePost />
				</Route>
			</Switch>
		</Router>
	);
}
