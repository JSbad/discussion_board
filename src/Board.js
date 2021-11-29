import React from "react";

class Board extends React.Component {
  render = () => {
    const loading = this.props.state.loading;
    const board = this.props.state.board;

    if (loading) {
      return (
        <div id="loading">
          <img src="loading.gif" alt="loading..." />
        </div>
      );
      //map the records into an array
    } else {
      const boardItems = board.map((item, index) => { // make sure for the api to match the names in response JSON
        const imageURL =
          item.image
            ? item.image
            : null;
        const title =
          item.title && item.title.length > 0
            ? item.title
            : null;
        const author =
          item.author && item.author.length > 0
            ? item.author
            : "Anonymous";
        const date =
          item.date && item.date.length > 0
            ? item.date
            : null;
        const noOfComments =
          item.commentsNo && item.commentsNo > 0
            ? item.commentsNo
            : "Noone commented yet";
        //pass the items from the array into a single HTML element
        //ADD PLACEHOLDER IMAGE INSTEAD OF ALT
        return (
          <div key={index.toString()} className="item">
            <div className="item-content">
            <p>{author}</p>
            <p>{date}</p>
            <p>{title}</p>
            <p>{noOfComments}</p>
            <div className="item-image">
              <img src={imageURL} alt="image"></img> 
            </div>
            <p>{content}</p>
            </div>
          </div>
        );
      });
      // return the array as a div
      return <div>{boardItems}</div>;
    }
  };
}

export default Board;
