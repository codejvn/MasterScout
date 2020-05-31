import React, { Component } from "react";

export class CommentBox extends Component {
  getComments = () => {
    try {
      return this.props.team.comments.map((comment) => <p>{comment}</p>);
    } catch (err) {
      return [];
    }
  };
  render() {
    return (
      <div>
        <h3>Comments</h3>
        {this.getComments()}
      </div>
    );
  }
}

export default CommentBox;
