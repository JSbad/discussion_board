import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, Container} from 'react-bootstrap';
import {useEffect, useRef, useState} from "react";

const Board = (props) => {
    const [posts,
        setPosts] = React.useState([]);

    useEffect(() => {

        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/posts')
            const data = await response.json();
            return data.payload;
        }

        fetchPosts().then(data => setPosts(data.reverse()));

    }, []);

    return (
        <Container
                className="d-grid gap-3"
                style={{
                marginTop: "30px"
            }}>
                {posts.map((post, index) => (
                    <Card
                        key={index.toString()}
                        className="rounded p-2 mb-3 bg-dark border-dark text-light border">
                        {/* onclick redirect to postid */}
                        <div className="post-title">{post.title}</div>
                        <div className="postId">{post.post_id}</div>
                        <div className="post-author">author: {post.user_id}</div>
                        <div className="post-date">Created {post.date_created}</div>
                    </Card>
                ))}
            </Container>
    )
}

export default Board;