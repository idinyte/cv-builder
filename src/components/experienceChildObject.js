import React, { Component } from "react";

export class ExperienceObject extends Component {
  constructor(props) {
    super(props);
  }

  displayMode = () => {
    const { company, position, description, start, end, objectId, deleteObject, areButtonsHidden } = this.props;
    return <div  className='flex-h'>
      <div>
        <p><b>Company name</b> {company}</p>
        <p><b>Position</b> {position}</p>
        <p><b>Description of main tasks</b> {description}</p>
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
    hideButtons(); // hides add, edit, delete buttons from parent and other ExperienceObjects
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