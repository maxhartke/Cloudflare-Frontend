import { AppProvider, Page, Button, DisplayText } from "@shopify/polaris";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "./post";
import PostCard from "./PostCard";
import Skeleton from "./Skeleton";

export default function Feed() {
	const [posts, setPosts] = useState<post[]>();
	const [isLoading, setisLoading] = useState(false);
	const Posts = () => {
		useEffect(() => {
			const getPosts = async () => {
				const resp = await fetch(
					"https://my-typescript-worker.hartke-max.workers.dev/"
				);
				const postsResp: any = await resp.text();
				const list: post[] = JSON.parse(postsResp);
				setPosts(list);
				setisLoading(false);
			};
			setisLoading(true);
			getPosts();
		}, []);
	};
	Posts();
	return (
		<AppProvider
			i18n={{}}
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
			<Page>
				<Link style={{ textDecoration: "none" }} to="/create-post">
					<Button>Create Post</Button>
				</Link>
				<div
					style={{
						marginTop: 25,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<DisplayText size="medium"></DisplayText>
					{posts == null ? <Skeleton></Skeleton> : null}
					{posts?.map((post) => (
						<div key={post.title} style={{ marginTop: 25 }}>
							<PostCard post={post}></PostCard>
						</div>
					))}
				</div>
			</Page>
		</AppProvider>
	);
}
