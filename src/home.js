import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, Container,  Navbar} from 'react-bootstrap';
import {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom';
import Board from './board.js';
const {v1: uuidv1} = require("uuid");

const Home = (props) => {
    const [user,
        setUser] = React.useState('');
    const [title,
        setTitle] = React.useState('');
    const [content,
        setContent] = React.useState('');
    const [image,
        setImage] = React.useState(undefined);
    const [imageName,
        setImageName] = React.useState('');
    const selectImage = (event) => {
        setImage(event.target.files[0])
        setImageName(event.target.files[0].name)
    }

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            const foundUser = localUser;
            setUser(foundUser);
        } else {
            const newUser = uuidv1();
            localStorage.setItem(newUser, user);
            setUser(newUser);
        }

    }, [user]);

    const onSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('imageName', 'images'+imageName)
        if (image !== null) {
            formData.append('image', image)
        } else {
            formData.append('image', '')
        }
        setTitle('');
        setContent('');
        setImage('');
        // window.location.reload(false); 
        
        const requestOptions = {
            method: 'post',
            body: formData
        }
        try {
            let response = await fetch(`http://localhost:3000/posts?userId=${user}`, requestOptions)
            if (response.status === 201) {
                console.log(response.data.payload)
            }
        } catch (err) {
            console.log(err);
        }

    }

    return ( <> 
    <Container id="main-container" style={{backgroundColor: "#2b2b2b"}}>
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
            <Container className="d-grid">
                <Form className="rounded p-2 mb-3 bg-dark" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="postTitle">
                        <Form.Label className="text-light">Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.currentTarget.value)}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postContent">
                        <Form.Label className="text-light">Write your post here</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={e => setContent(e.currentTarget.value)}
                            rows={4}
                            minLength={10}
                            maxLength={63206}
                            required
                            style={{
                            resize: "none"
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="picUpload">
                        <Form.Label className="text-light">Upload picture</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={selectImage}
                            accept="image/png, image/jpg, image/jpeg*"
                            style={{
                            maxWidth: "15rem"
                        }}/>
                    </Form.Group>
                    <Button
                        className="bg-secondary border-secondary float-end"
                        type="submit"
                    >Submit</Button>
                    <Button onClick={e=>console.log(image)}>test</Button>
                </Form>
            </Container>
            <Board/>
        </Container>
    </Container> 
    </>

        
        );
};
export default Home;