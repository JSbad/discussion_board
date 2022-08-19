import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, Container, FormGroup, Col, Row, Navbar, Nav} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";

const Post = (props) => {
    const {id} = useParams();
    const [post,
        setPost] = React.useState([]);
    const [comment,
        setComment] = React.useState('');
    const [comments,
        setComments] = React.useState([]);
    const user = localStorage.getItem("user");

    useEffect(() => {
        async function fetchComments() {
            const response = await fetch(`http://localhost:3000/posts/${id}/comments`)
            const data = await response.json();
            return data.payload;
        }
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/posts/${id}`)
            const data = await response.json();
            return data.payload;
        }
        fetchData().then(data => setPost(data));
        fetchComments().then(data => setComments(data.reverse()));
    }, []);

    const onSubmit = async e => {
        e.preventDefault();

        setComment('');
        window.location.reload(false); 
        const requestOptions = {
            method: 'post',
            body: new URLSearchParams({
              'user_id':user,
              'content':comment  
            }),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        }
        console.log(requestOptions)
        try {
            let response = await fetch(`http://localhost:3000/posts/${id}/comments`, requestOptions)
            if (response.status === 200) {
                console.log(response.data.payload)
            }
        } catch (err) {
            console.log(err);
        }

    }

    return ( 
    <>
     
    <Container 
        id="main-container"
        style={{
        backgroundColor: "#2b2b2b"
    }}>
        <Navbar bg="dark" sticky="top">
        <Container>
          <Link to='/'style={{ textDecoration: 'none' }}>Home</Link>
        </Container>
      </Navbar>
        <Container>
            <h1 className=" text-light text-center">Welcome to the discussion board, discuss away</h1>
        </Container>
        <Container
            className="p-4 mt-3 bg-dark rounded bg-gradient"
            id="secondary-container">
            <Container
                className="d-grid gap-3"
                style={{
                marginTop: "30px"
            }}>
                
                {post.map((post, index) => (
                    <Card
                        key={index.toString()}
                        className="rounded p-2 mb-3 bg-dark border-dark text-light border">
                        <div className="post-title" to={`/${post.post_id}`}>{post.title}</div>
                        <div className="post-author">author: {post.user_id}</div>
                        <div className="post-date">Created {post.date_created}</div>
                        <div className="post-content">{post.content}</div>
                        <img className="post-image" src={`localhost:3000/images/${post.imageName}`}alt=''></img>
                    </Card>
                ))}
              <Container className="d-grid">
                <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="rounded p-1 mb-3 bg-secondary" controlId="comment">
                        <Form.Control
                            type="text"
                            value={comment}
                            minLength={2}
                            maxLength={63206}
                            onChange={e => setComment(e.currentTarget.value)}
                            placeholder='Write a comment...'
                            />
                            <Button
                        className="bg-dark border-dark float-end"
                        type="submit"
                    >Submit</Button>
                    </Form.Group>
                </Form>
                </Container>
                {comments.map((comment, index) => (
                    <Card
                        key={index.toString()}
                        className="rounded p-2 mb-3 bg-gradient bg-secondary border-secondary text-light border">
                        <div className="comment-author">{comment.user_id}</div>
                        <div className="comment-date">{comment.date_created}</div>
                        <div className="comment-content">{comment.content}</div>
                    </Card>
                ))}
            </Container>
        </Container>
    </Container> 
    </>
)

}
export default Post;