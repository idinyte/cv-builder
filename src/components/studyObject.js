import React, { Component } from "react";

export class StudyObject extends Component {
  constructor(props) {
    super(props);
  }

  displayMode = () => {
    const { school, title, start, end, objectId, deleteObject, areButtonsHidden } = this.props;
    return <div>
      <div>
        <p>Educational institution: {school}</p>
        {!areButtonsHidden && <button onClick={this.editButtonEvent}>Edit</button>}
        {!areButtonsHidden && <button onClick={() => deleteObject(objectId)}>Delete</button>}
      </div>
      <p>Title of study: {title}</p>
      <p>Start date: {start}</p>
      <p>End date: {end}</p>
    </div>
  }

  editButtonEvent = () => {
    const { copyStateToParent, objectId, hideButtons } = this.props;
    hideButtons();
    copyStateToParent(objectId); // fills form and also sets editing to true
  }

  EditMode = () => {
    const { objectId, handleEdit } = this.props;
    return handleEdit(objectId)
  }

  render() {
    const { editing } = this.props;
    return editing  ? this.EditMode() : this.displayMode()
  }
}