import React from "react";
import "./App.css";
import Board from "./Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      board: [],
    };
  }
  //handle post submission form
  submitPost = async (evt) => {
    evt.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const content = document.querySelector("#content").value.trim();
    const date = new Date();
    //verify form content
    if (title.length > 0 && content.length > 0) {
      this.setState({
        title: title,
        author: author,
        content: content,
        date: date,
        loading: true,
      });
      // const url = API url
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ title: title, content: content, date: date }),
        };
        const response = await fetch(url, requestOptions);
        const jsonData = await response.json();
        if (response.status === 201) {
          //call map function to update board ???
          
          this.setState({
            loading: false,
            postID: jsonData.id,
          });
        }
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
          board: [],
        });
      }
    }
  };

  //handle loading the main post board
  mainBoard = async (evt) => {
    evt.preventDefault();
    //API URL  const url =
    this.setState({
      loading: true,
    });
    try {
      const response = await fetch(url, { method: "GET" });
      const jsonData = await response.json();
      this.setState({
        loading: false,
        board: jsonData.board,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        board: [],
      });
    }
  };
  //call the board function and render HTML
  async componentDidMount() {
    // ???
    this.mainBoard();
  }
    render = () => {
      return (
      <div className="App">
        <header className="App-header">
          <h1>Sample title</h1>
        </header>
        <form onSubmit={this.submitPost}>
          <label htmlFor="author">Username:</label>
          <input id="author" type="text" />
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" required />
          <input
            id="content"
            type="text"
            placeholder="Write your post here"
            required
          ></input>
        </form>
        <Board state={this.state} />
      </div>
      );
    };
  
}

export default App;
