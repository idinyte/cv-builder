import React, { useState } from "react";
import { ExperienceObject } from './experienceChildObject';
import uniqid from "uniqid";

export const Experience = () => {
  interface ExperienceChildObject{
    company: string,
    position: string,
    description: string,
    start: string,
    end: string,
    editing: boolean,
    id: string
  }
  const [formMode, setFormMode] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [experienceChildObjects, setExperienceChildObjects] = useState<ExperienceChildObject[]>([]);
  const [experienceChildObjectData, setExperienceChildObjectData] = useState<ExperienceChildObject>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceChildObjectData({ ...experienceChildObjectData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //push new ExperienceObject
    setExperienceChildObjects([...experienceChildObjects, experienceChildObjectData]);

    clearAndCloseForm();
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>, objectId: string) => {
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

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, objectId: string) => {
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

  const fillFormFromExperienceObject = (objectId: string) => {
    if (experienceChildObjectData.id === objectId) return

    const data = experienceChildObjects.find(item => item.id === objectId);
    if (data === undefined) return;

    data.editing = true;
    setExperienceChildObjectData(data);
  }

  const displayFormMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => handleEditSubmit(event, objectId) : handleSubmit} className='container'>
      <div className='flex-h'>
        <div className='form-flex-child'>
          <label htmlFor="company">Company name</label>
          <input type="text" id='company' placeholder='Company name' value={experienceChildObjectData.company} onChange={handleChange} name='company'/>
          <label htmlFor="position">Position</label>
          <input type="text" id='position' placeholder='Position' value={experienceChildObjectData.position} onChange={handleChange} name='position'/>
          <label htmlFor="description">Description of tasks</label>
          <input type="text" id='description' placeholder='Description of tasks' value={experienceChildObjectData.description} onChange={handleChange} name='description'/>
        </div>
        <div className='form-flex-child'>
          <label htmlFor="start-experience">Start date</label>
          <input type="date" id='start-experience' placeholder='Start date' value={experienceChildObjectData.start} onChange={handleChange} name='start'/>
          <label htmlFor="end-experience">End date</label>
          <input type="date" id='end-experience' placeholder='End date' value={experienceChildObjectData.end} onChange={handleChange} name='end'/>
        </div>
      </div>
      <div className="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  const displayMode = () => {
    return showButtons ? <button onClick={() => { setFormMode(true); setShowButtons(false) }} className="button-inverted mt-4">Add</button> : null
  }

  const deleteExperienceObject = (objectId: string) => {
    const filtered = experienceChildObjects.filter(object => object.id !== objectId);
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