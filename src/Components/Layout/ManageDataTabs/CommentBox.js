import React, { Component } from "react";

export class CommentBox extends Component {
  getComments = () => {
    try {
      return this.props.team.comments.map((comment) => <h4>{comment}</h4>);
    } catch (err) {
      return [];
    }
  };
  render() {
    return (
      <div>
        <h2>Comments</h2>
        {this.getComments()}
      </div>
    );
  }
}

export default CommentBox;
