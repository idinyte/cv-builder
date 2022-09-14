import React, { Component } from "react";
import { ExperienceObject } from './experienceChildObject.js'
import uniqid from "uniqid";

export class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMode: false,
      hideButtons: false,
      experienceChildObjects: [],
      experienceChildObjectData: {
        company: '',
        position: '',
        description: '',
        start: '',
        end: '',
        editing: false,
        id: uniqid()
      }
    }
  }

  clearAndCloseForm = () => {
    this.setState({
      formMode: false,
      hideButtons: false,
      experienceChildObjectData: {
        company: '',
        position: '',
        description: '',
        start: '',
        end: '',
        editing: false,
        id: uniqid()
      }
    });
  }

  handleChange = (e) => {
    let copy = { ...this.state.experienceChildObjectData }
    copy[e.target.name] = e.target.value;
    this.setState({ experienceChildObjectData: copy });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //push new ExperienceObject
    this.setState(prevState => ({
      experienceChildObjects: [...prevState.experienceChildObjects, this.state.experienceChildObjectData],
    }));

    this.clearAndCloseForm();
  }

  handleEditSubmit = (e, objectId) => {
    e.preventDefault();
    let copy = [...this.state.experienceChildObjects];
    this.setState({
      experienceChildObjects: copy.map(item => {
        if (item.id === objectId) {
          let studyObject = this.state.experienceChildObjectData;
          studyObject.editing = false;
          return studyObject
        }
        else return item
      })
    });

    this.clearAndCloseForm();
  }

  handleCancel = (e, objectId) => {
    e.preventDefault();

    // revert state if editing child
    if (objectId) {
      let copy = [...this.state.experienceChildObjects];
      this.setState({
        experienceChildObjects: copy.map(item => {
          if (item.id === objectId) {
            item.editing = false;
            return item
          }
          else return item
        }),
      });
    }

    this.clearAndCloseForm();
  }

  hideButtons = () => {
    this.setState({ hideButtons: true });
  }

  fillFormFromExperienceObject = (objectId) => {
    if (this.state.experienceChildObjectData.id === objectId) return

    const data = this.state.experienceChildObjects.find(item => item.id === objectId);
    data.editing = true;
    this.setState({ experienceChildObjectData: data });
  }

  formMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => this.handleEditSubmit(event, objectId) : this.handleSubmit} onCancel={this.handleCancel} className='container'>
      <div className='flex-h'>
        <div className='form-flex-child'>
        <label for="company">Company name</label>
          <input type="text" id='company' placeholder='Company name' value={this.state.experienceChildObjectData.company} onChange={this.handleChange} name='company' required />
          <label for="position">Position</label>
          <input type="text" id='position' placeholder='Position' value={this.state.experienceChildObjectData.position} onChange={this.handleChange} name='position' required />
          <label for="description">Description of tasks</label>
          <input type="text" id='description' placeholder='Description of tasks' value={this.state.experienceChildObjectData.description} onChange={this.handleChange} name='description' required />
        </div>
        <div className='form-flex-child'>
          <label for="start-experience">Start date</label>
          <input type="date" id='start-experience' placeholder='Start date' value={this.state.experienceChildObjectData.start} onChange={this.handleChange} name='start' required/>
          <label for="end-experience">End date</label>
          <input type="date" id='end-experience' placeholder='End date' value={this.state.experienceChildObjectData.end} onChange={this.handleChange} name='end' required/>
        </div>
      </div>
      <div class="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => this.handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  displayMode = () => {
    return this.state.hideButtons ? null : <button onClick={() => { this.setState({ formMode: true, hideButtons: true }) }} className="button-inverted mt-4">Add</button>
  }

  deleteExperienceObject = (key) => {
    const filtered = this.state.experienceChildObjects.filter(object => object.id !== key);
    this.setState({ experienceChildObjects: filtered });
  }

  render() {
    return <div className="edu-container">
      <h2 className="center-text">Experience</h2>
      {this.state.experienceChildObjects.map((data) => {
        return <ExperienceObject company={data.company} position={data.position} description={data.description} start={data.start} end={data.end}
          objectId={data.id} deleteObject={this.deleteExperienceObject} handleEdit={this.formMode} copyStateToParent={this.fillFormFromExperienceObject}
          hideButtons={this.hideButtons} areButtonsHidden={this.state.hideButtons} editing={data.editing} key={data.id} />;
      })}
      {this.state.formMode ? this.formMode() : this.displayMode()}
    </div>
  }
}