import React, { Component } from "react";
import { StudyObject } from './studyObject.js'
import uniqid from "uniqid";

export class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formMode: false,
      hideButtons: false,
      studyObjects: [],
      studyObjectData: {
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
      studyObjectData: {
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
    let copy = { ...this.state.studyObjectData }
    copy[e.target.name] = e.target.value;
    this.setState({ studyObjectData: copy });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //push new studyObject
    this.setState(prevState => ({
      studyObjects: [...prevState.studyObjects, this.state.studyObjectData],
    }));

    this.clearAndCloseForm();
  }

  handleEditSubmit = (e, objectId) => {
    e.preventDefault();
    let copy = [...this.state.studyObjects];
    this.setState({
      studyObjects: copy.map(item => {
        if (item.id === objectId) {
          let studyObject = this.state.studyObjectData;
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
    if (objectId) {
      let copy = [...this.state.studyObjects];
      this.setState({
        studyObjects: copy.map(item => {
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

  fillFormFromStudyObject = (objectId) => {
    if (this.state.studyObjectData.id === objectId) return

    const data = this.state.studyObjects.find(item => item.id === objectId);
    data.editing = true;
    this.setState({ studyObjectData: data });
  }

  formMode = (objectId = '') => {
    return <form onSubmit={objectId ? (event) => this.handleEditSubmit(event, objectId) : this.handleSubmit} onCancel={this.handleCancel} className='container'>
      <div>
        <input type="text" placeholder='Educational institution' value={this.state.studyObjectData.school} onChange={this.handleChange} name='school' />
        <input type="text" placeholder='Title of study' value={this.state.studyObjectData.title} onChange={this.handleChange} name='title' />
        <label for="start">Start date</label>
        <input type="date" id='start' placeholder='Start date' value={this.state.studyObjectData.start} onChange={this.handleChange} name='start' />
        <label for="end">End date</label>
        <input type="date" id='end' placeholder='End date' value={this.state.studyObjectData.end} onChange={this.handleChange} name='end' />
        <input type="submit" value="Confirm" />
        <button onClick={(event) => this.handleCancel(event, objectId)}>Cancel</button>
      </div>
    </form>
  }

  displayMode = () => {
    return this.state.hideButtons ? null : <button onClick={() => { this.setState({ formMode: true, hideButtons: true }) }}>Add</button>
  }

  deleteStudyObject = (key) => {
    const filtered = this.state.studyObjects.filter(object => object.id !== key);
    this.setState(
      prev => ({
        ...prev,
        studyObjects: filtered
      }));
  }

  render() {
    return <div>
      <h2>Education</h2>
      {this.state.studyObjects.map((data) => {
        return <StudyObject school={data.school} title={data.title} start={data.start} end={data.end}
          objectId={data.id} deleteObject={this.deleteStudyObject} handleEdit={this.formMode} copyStateToParent={this.fillFormFromStudyObject}
          hideButtons={this.hideButtons} areButtonsHidden={this.state.hideButtons} editing={data.editing} key={data.id} />;
      })}
      {this.state.formMode ? this.formMode() : this.displayMode()}
    </div>
  }
}