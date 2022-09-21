import React from "react";

interface Props {
  school: string,
  title: string,
  start: string,
  end: string,
  editing: boolean,
  id: string,
  deleteObject: (id: string) => void,
  parentFormMode: (id?: string) => JSX.Element,
  copyStateToParent: (id: string) => void,
  hideButtons: () => void,
  areButtonsShown: boolean,
}

export const EducationObject = (props: Props) => {

  const displayMode = () => {
    const { school, title, start, end, id, deleteObject, areButtonsShown } = props;
    return (<div className='flex-h'>
      <div>
        <p><b>Educational institution</b> {school}</p>
        <p><b>Title of study</b> {title}</p>
        <p><b>Start date</b> {start}</p>
        <p><b>End date</b> {end}</p>
      </div>
      <div>
        {areButtonsShown && <button onClick={editButtonEvent} className="icon mr-2"><span className="material-icons">
          edit
        </span></button>}
        {areButtonsShown && <button onClick={() => deleteObject(id)} className="icon-red"><span className="material-icons">
          delete
        </span></button>}
      </div>
    </div>)
  }

  const editButtonEvent = () => {
    const { copyStateToParent, id, hideButtons } = props;
    hideButtons();
    copyStateToParent(id); // fills form and also sets editing to true
  }

  const editMode = () => {
    const { id, parentFormMode } = props;
    return parentFormMode(id);
  }

  return props.editing ? editMode() : displayMode();
}