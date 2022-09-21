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
  const [areButtonsShown, setAreButtonsShown] = useState<boolean>(true);
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
    setAreButtonsShown(true);
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

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    let copy = [...educationChildObjects].map(item => {
      if (item.id === id) {
        let EducationObject = educationChildObjectData;
        EducationObject.editing = false;
        return EducationObject
      }
      else return item
    });

    setEducationChildObjects(copy);

    clearAndCloseForm();
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (id) {
      let copy = [...educationChildObjects].map(item => {
        if (item.id === id) {
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
    setAreButtonsShown(false);
  }

  const fillFormFromEducationObject = (id: string) => {
    if (educationChildObjectData.id === id) return

    const data = educationChildObjects.find(item => item.id === id);
    if (data === undefined) return;

    data.editing = true;
    setEducationChildObjectData(data);
  }

  const displayFormMode = (id = ''):JSX.Element => {
    return <form onSubmit={id ? (event) => handleEditSubmit(event, id) : handleSubmit}>
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
        <button onClick={(event) => handleCancel(event, id)} className="button">Cancel</button>
      </div>
    </form>
  }

  const displayMode = () => {
    return areButtonsShown ? <button onClick={() => { setFormMode(true); setAreButtonsShown(false); }} className="button-inverted mt-4">Add</button> : null;
  }

  const deleteEducationObject = (key: string) => {
    const filtered = educationChildObjects.filter(object => object.id !== key);
    setEducationChildObjects(filtered);
  }

  return (<div className="edu-container">
    <h2 className="center-text">Education</h2>
    {educationChildObjects.map((data) => {
      return <EducationObject school={data.school} title={data.title} start={data.start} end={data.end}
        id={data.id} deleteObject={deleteEducationObject} parentFormMode={displayFormMode} copyStateToParent={fillFormFromEducationObject}
        hideButtons={hideButtons} areButtonsShown={areButtonsShown} editing={data.editing} key={data.id} />;
    })}
    {formMode ? displayFormMode() : displayMode()}
  </div>)
}