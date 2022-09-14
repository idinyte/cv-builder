import React, { Component } from "react";
import { EducationObject } from './educationChildObject.js'
import uniqid from "uniqid";
import '../styles/educationAndExperience.css';

export class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMode: false,
      hideButtons: false,
      educationChildObjects: [],
      educationChildObjectData: {
        school: '',
        title: '',
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
      educationChildObjectData: {
        school: '',
        title: '',
        start: '',
        end: '',
        editing: false,
        id: uniqid()
      }
    });
  }

  handleChange = (e) => {
    let copy = { ...this.state.educationChildObjectData }
    copy[e.target.name] = e.target.value;
    this.setState({ educationChildObjectData: copy });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //push new EducationObject
    this.setState(prevState => ({
      educationChildObjects: [...prevState.educationChildObjects, this.state.educationChildObjectData],
    }));

    this.clearAndCloseForm();
  }

  handleEditSubmit = (e, objectId) => {
    e.preventDefault();
    let copy = [...this.state.educationChildObjects];
    this.setState({
      educationChildObjects: copy.map(item => {
        if (item.id === objectId) {
          let EducationObject = this.state.educationChildObjectData;
          EducationObject.editing = false;
          return EducationObject
        }
        else return item
      })
    });

    this.clearAndCloseForm();
  }

  handleCancel = (e, objectId) => {
    e.preventDefault();
    if (objectId) {
      let copy = [...this.state.educationChildObjects];
      this.setState({
        educationChildObjects: copy.map(item => {
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

  fillFormFromEducationObject = (objectId) => {
    if (this.state.educationChildObjectData.id === objectId) return

    const data = this.state.educationChildObjects.find(item => item.id === objectId);
    data.editing = true;
    this.setState({ educationChildObjectData: data });
  }

  formMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => this.handleEditSubmit(event, objectId) : this.handleSubmit} onCancel={this.handleCancel}>
      <div className='flex-h'>
        <div className='form-flex-child'>
          <label for="school">Educational institution</label>
          <input type="text" id='school' placeholder='Educational institution' value={this.state.educationChildObjectData.school} onChange={this.handleChange} name='school' required/><br />
          <label for="title">Title of study</label>
          <input type="text" id='title' placeholder='Title of study' value={this.state.educationChildObjectData.title} onChange={this.handleChange} name='title' required/>
        </div>
        <div className='form-flex-child'>
          <label for="start">Start date</label>
          <input type="date" id='start' placeholder='Start date' value={this.state.educationChildObjectData.start} onChange={this.handleChange} name='start' required/><br />
          <label for="end">End date</label>
          <input type="date" id='end' placeholder='End date' value={this.state.educationChildObjectData.end} onChange={this.handleChange} name='end' required/>
        </div>
      </div><br />
      <div class="form-buttons">
        <input type="submit" value="Confirm" className="button-inverted" />
        <button onClick={(event) => this.handleCancel(event, objectId)} className="button">Cancel</button>
      </div>
    </form>
  }

  displayMode = () => {
    return this.state.hideButtons ? null : <button onClick={() => { this.setState({ formMode: true, hideButtons: true }) }} className="button-inverted mt-4">Add</button>
  }

  deleteEducationObject = (key) => {
    const filtered = this.state.educationChildObjects.filter(object => object.id !== key);
    this.setState({ educationChildObjects: filtered });
  }

  render() {
    return <div className="edu-container">
      <h2 className="center-text">Education</h2>
      {this.state.educationChildObjects.map((data) => {
        return <EducationObject school={data.school} title={data.title} start={data.start} end={data.end}
          objectId={data.id} deleteObject={this.deleteEducationObject} handleEdit={this.formMode} copyStateToParent={this.fillFormFromEducationObject}
          hideButtons={this.hideButtons} areButtonsHidden={this.state.hideButtons} editing={data.editing} key={data.id} />;
      })}
      {this.state.formMode ? this.formMode() : this.displayMode()}
    </div>
  }
}