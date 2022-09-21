import React, { useState } from "react";
import { EducationObject } from './educationChildObject'
import uniqid from "uniqid";
import '../styles/educationAndExperience.css';

export const Education = () => {
  interface EducationChildObject{
    school: string,
    title: string,
    start: string,
    end: string,
    editing: boolean,
    id: string
  }
  const [formMode, setFormMode] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [educationChildObjects, setEducationChildObjects] = useState<EducationChildObject[]>([]);
  const [educationChildObjectData, setEducationChildObjectData] = useState<EducationChildObject>({
    school: '',
    title: '',
    start: '',
    end: '',
    editing: false,
    id: uniqid()
  });

  const clearAndCloseForm = () => {
    setFormMode(false);
    setShowButtons(true);
    setEducationChildObjectData({
      school: '',
      title: '',
      start: '',
      end: '',
      editing: false,
      id: uniqid()
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducationChildObjectData({ ...educationChildObjectData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //push new EducationObject
    setEducationChildObjects([...educationChildObjects, educationChildObjectData]);

    clearAndCloseForm();
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>, objectId: string) => {
    e.preventDefault();
    let copy = [...educationChildObjects].map(item => {
      if (item.id === objectId) {
        let EducationObject = educationChildObjectData;
        EducationObject.editing = false;
        return EducationObject
      }
      else return item
    });

    setEducationChildObjects(copy);

    clearAndCloseForm();
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, objectId: string) => {
    e.preventDefault();
    if (objectId) {
      let copy = [...educationChildObjects].map(item => {
        if (item.id === objectId) {
          item.editing = false;
          return item
        }
        else return item
      });

      setEducationChildObjects(copy);
    }

    clearAndCloseForm();
  }

  const hideButtons = () => {
    setShowButtons(false);
  }

  const fillFormFromEducationObject = (objectId: string) => {
    if (educationChildObjectData.id === objectId) return

    const data = educationChildObjects.find(item => item.id === objectId);
    if (data === undefined) return;

    data.editing = true;
    setEducationChildObjectData(data);
  }

  const displayFormMode = (objectId = ''):JSX.Element => {
    return <form onSubmit={objectId ? (event) => handleEditSubmit(event, objectId) : handleSubmit}>
      <div className='flex-h'>
        <div className='form-flex-child'>
          <label htmlFor="school">Educational institution</label>
          <input type="text" id='school' placeholder='Educational institution' value={educationChildObjectData.school} onChange={handleChange} name='school' /><br />
          <label htmlFor="title">Title of study</label>
          <input type="text" id='title' placeholder='Title of study' value={educationChildObjectData.title} onChange={handleChange} name='title' />
        </div>
        <div className='form-flex-child'>
          <label htmlFor="start">Start date</label>
          <input type="date" id='start' placeholder='Start date' value={educationChildObjectData.start} onChange={handleChange} name='start' /><br />
          <label htmlFor="end">End date</label>
          <input type="date" id='end' placeholder='End date' value={educationChildObjectData.end} onChange={handleChange} name='end' />
        </div>
      </div><br />
      <div className="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  const displayMode = () => {
    return showButtons ? <button onClick={() => { setFormMode(true); setShowButtons(false); }} className="button-inverted mt-4">Add</button> : null;
  }

  const deleteEducationObject = (key: string) => {
    const filtered = educationChildObjects.filter(object => object.id !== key);
    setEducationChildObjects(filtered);
  }

  return (<div className="edu-container">
    <h2 className="center-text">Education</h2>
    {educationChildObjects.map((data) => {
      return <EducationObject school={data.school} title={data.title} start={data.start} end={data.end}
        objectId={data.id} deleteObject={deleteEducationObject} handleEdit={displayFormMode} copyStateToParent={fillFormFromEducationObject}
        hideButtons={hideButtons} showButtons={showButtons} editing={data.editing} key={data.id} />;
    })}
    {formMode ? displayFormMode() : displayMode()}
  </div>)
}