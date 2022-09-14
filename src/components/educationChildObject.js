import React, { Component } from "react";

export class EducationObject extends Component {
  constructor(props) {
    super(props);
  }

  displayMode = () => {
    const { school, title, start, end, objectId, deleteObject, areButtonsHidden } = this.props;
    return <div className='flex-h'>
      <div>
        <p><b>Educational institution</b> {school}</p>
        <p><b>Title of study</b> {title}</p>
        <p><b>Start date</b> {start}</p>
        <p><b>End date</b> {end}</p>
      </div>
      <div>
        {!areButtonsHidden && <button onClick={this.editButtonEvent} className="icon mr-2"><span className="material-icons">
          edit
        </span></button>}
        {!areButtonsHidden && <button onClick={() => deleteObject(objectId)} className="icon-red"><span className="material-icons">
          delete
        </span></button>}
      </div>
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
    return editing ? this.EditMode() : this.displayMode()
  }
}