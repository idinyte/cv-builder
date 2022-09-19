import React, { useState } from "react";
import { EducationObject } from './educationChildObject.js'
import uniqid from "uniqid";
import '../styles/educationAndExperience.css';

export const Education = () => {
  const [formMode, setFormMode] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [educationChildObjects, setEducationChildObjects] = useState([]);
  const [educationChildObjectData, setEducationChildObjectData] = useState({
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

  const handleChange = (e) => {
    setEducationChildObjectData({ ...educationChildObjectData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //push new EducationObject
    setEducationChildObjects([...educationChildObjects, educationChildObjectData]);

    clearAndCloseForm();
  }

  const handleEditSubmit = (e, objectId) => {
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

  const handleCancel = (e, objectId) => {
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

  const fillFormFromEducationObject = (objectId) => {
    if (educationChildObjectData.id === objectId) return

    const data = educationChildObjects.find(item => item.id === objectId);
    data.editing = true;
    setEducationChildObjectData(data);
  }

  const displayFormMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => handleEditSubmit(event, objectId) : handleSubmit} onCancel={handleCancel}>
      <div className='flex-h'>
        <div className='form-flex-child'>
          <label for="school">Educational institution</label>
          <input type="text" id='school' placeholder='Educational institution' value={educationChildObjectData.school} onChange={handleChange} name='school' /><br />
          <label for="title">Title of study</label>
          <input type="text" id='title' placeholder='Title of study' value={educationChildObjectData.title} onChange={handleChange} name='title' />
        </div>
        <div className='form-flex-child'>
          <label for="start">Start date</label>
          <input type="date" id='start' placeholder='Start date' value={educationChildObjectData.start} onChange={handleChange} name='start' /><br />
          <label for="end">End date</label>
          <input type="date" id='end' placeholder='End date' value={educationChildObjectData.end} onChange={handleChange} name='end' />
        </div>
      </div><br />
      <div class="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  const displayMode = () => {
    return showButtons ? <button onClick={() => { setFormMode(true); setShowButtons(false); }} className="button-inverted mt-4">Add</button> : null;
  }

  const deleteEducationObject = (key) => {
    const filtered = educationChildObjects.filter(object => object.id !== key);
    setEducationChildObjects(filtered);
  }

  return <div className="edu-container">
    <h2 className="center-text">Education</h2>
    {educationChildObjects.map((data) => {
      console.log(data);
      return <EducationObject school={data.school} title={data.title} start={data.start} end={data.end}
        objectId={data.id} deleteObject={deleteEducationObject} handleEdit={displayFormMode} copyStateToParent={fillFormFromEducationObject}
        hideButtons={hideButtons} showButtons={showButtons} editing={data.editing} key={data.id} />;
    })}
    {formMode ? displayFormMode() : displayMode()}
  </div>
}