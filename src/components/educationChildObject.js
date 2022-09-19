export const EducationObject = (props) => {

  const displayMode = () => {
    const { school, title, start, end, objectId, deleteObject, showButtons } = props;
    return <div className='flex-h'>
      <div>
        <p><b>Educational institution</b> {school}</p>
        <p><b>Title of study</b> {title}</p>
        <p><b>Start date</b> {start}</p>
        <p><b>End date</b> {end}</p>
      </div>
      <div>
        {showButtons && <button onClick={editButtonEvent} className="icon mr-2"><span className="material-icons">
          edit
        </span></button>}
        {showButtons && <button onClick={() => deleteObject(objectId)} className="icon-red"><span className="material-icons">
          delete
        </span></button>}
      </div>
    </div>
  }

  const editButtonEvent = () => {
    const { copyStateToParent, objectId, hideButtons } = props;
    hideButtons();
    copyStateToParent(objectId); // fills form and also sets editing to true
  }

  const editMode = () => {
    const { objectId, handleEdit } = props;
    return handleEdit(objectId);
  }

  return props.editing ? editMode() : displayMode();
}