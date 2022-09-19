export const ExperienceObject = (props) => {
  const displayMode = () => {
    const { company, position, description, start, end, objectId, deleteObject, showButtons } = props;
    return <div  className='flex-h'>
      <div>
        <p><b>Company name</b> {company}</p>
        <p><b>Position</b> {position}</p>
        <p><b>Description of main tasks</b> {description}</p>
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
    hideButtons(); // hides add, edit, delete buttons from parent and other ExperienceObjects
    copyStateToParent(objectId); // fills form and also sets editing to true
  }

  const editMode = () => {
    const { objectId, handleEdit } = props;
    return handleEdit(objectId)
  }

  return props.editing ? editMode() : displayMode();
}