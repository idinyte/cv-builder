import React, { useState } from "react";
import { ExperienceObject } from './experienceChildObject.js'
import uniqid from "uniqid";

export const Experience = () => {
  const [formMode, setFormMode] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [experienceChildObjects, setExperienceChildObjects] = useState([]);
  const [experienceChildObjectData, setExperienceChildObjectData] = useState({
    company: '',
    position: '',
    description: '',
    start: '',
    end: '',
    editing: false,
    id: uniqid()
  });

  const clearAndCloseForm = () => {
    setFormMode(false);
    setShowButtons(true);
    setExperienceChildObjectData({
      company: '',
      position: '',
      description: '',
      start: '',
      end: '',
      editing: false,
      id: uniqid()
    });
  }

  const handleChange = (e) => {
    setExperienceChildObjectData({ ...experienceChildObjectData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //push new ExperienceObject
    setExperienceChildObjects([...experienceChildObjects, experienceChildObjectData]);

    clearAndCloseForm();
  }

  const handleEditSubmit = (e, objectId) => {
    e.preventDefault();
    let copy = [...experienceChildObjects].map(item => {
      if (item.id === objectId) {
        let experienceObject = experienceChildObjectData;
        experienceObject.editing = false;
        return experienceObject
      }
      else return item
    });

    setExperienceChildObjects(copy);

    clearAndCloseForm();
  }

  const handleCancel = (e, objectId) => {
    e.preventDefault();
    if (objectId) {
      let copy = [...experienceChildObjects].map(item => {
        if (item.id === objectId) {
          item.editing = false;
          return item
        }
        else return item
      });

      setExperienceChildObjects(copy);
    }

    clearAndCloseForm();
  }

  const hideButtons = () => {
    setShowButtons(false);
  }

  const fillFormFromExperienceObject = (objectId) => {
    if (experienceChildObjectData.id === objectId) return

    const data = experienceChildObjects.find(item => item.id === objectId);
    data.editing = true;
    setExperienceChildObjectData(data);
  }

  const displayFormMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => handleEditSubmit(event, objectId) : handleSubmit} onCancel={handleCancel} className='container'>
      <div className='flex-h'>
        <div className='form-flex-child'>
          <label for="company">Company name</label>
          <input type="text" id='company' placeholder='Company name' value={experienceChildObjectData.company} onChange={handleChange} name='company'/>
          <label for="position">Position</label>
          <input type="text" id='position' placeholder='Position' value={experienceChildObjectData.position} onChange={handleChange} name='position'/>
          <label for="description">Description of tasks</label>
          <input type="text" id='description' placeholder='Description of tasks' value={experienceChildObjectData.description} onChange={handleChange} name='description'/>
        </div>
        <div className='form-flex-child'>
          <label for="start-experience">Start date</label>
          <input type="date" id='start-experience' placeholder='Start date' value={experienceChildObjectData.start} onChange={handleChange} name='start'/>
          <label for="end-experience">End date</label>
          <input type="date" id='end-experience' placeholder='End date' value={experienceChildObjectData.end} onChange={handleChange} name='end'/>
        </div>
      </div>
      <div class="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  const displayMode = () => {
    return showButtons ? <button onClick={() => { setFormMode(true); setShowButtons(false) }} className="button-inverted mt-4">Add</button> : null
  }

  const deleteExperienceObject = (key) => {
    const filtered = experienceChildObjects.filter(object => object.id !== key);
    setExperienceChildObjects(filtered);
  }

  return <div className="edu-container">
    <h2 className="center-text">Experience</h2>
    {experienceChildObjects.map((data) => {
      return <ExperienceObject company={data.company} position={data.position} description={data.description} start={data.start} end={data.end}
        objectId={data.id} deleteObject={deleteExperienceObject} handleEdit={displayFormMode} copyStateToParent={fillFormFromExperienceObject}
        hideButtons={hideButtons} showButtons={showButtons} editing={data.editing} key={data.id} />;
    })}
    {formMode ? displayFormMode() : displayMode()}
  </div>
}