import { Page, Button, DisplayText } from "@shopify/polaris";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pageStyle } from "./CreatePost";
import { post } from "./post";
import PostCard from "./PostCard";
import Skeleton from "./Skeleton";

export default function Feed() {
	const [posts, setPosts] = useState<post[]>();
	const Posts = () => {
		useEffect(() => {
			const getPosts = async () => {
				const resp = await fetch(
					"https://my-typescript-worker.hartke-max.workers.dev/"
				);
				const postsResp: any = await resp.text();
				const list: post[] = JSON.parse(postsResp);
				setPosts(list);
			};
			getPosts();
		}, []);
	};
	Posts();
	return (
		<Page>
			<Link style={{ textDecoration: "none" }} to="/create-post">
				<Button>Create Post</Button>
			</Link>
			<div style={pageStyle}>
				<DisplayText size="medium"></DisplayText>
				{posts == null ? <Skeleton></Skeleton> : null}
				{posts?.map((post) => (
					<div key={post.title} style={{ marginTop: 25 }}>
						<PostCard post={post}></PostCard>
					</div>
				))}
			</div>
		</Page>
	);
}
