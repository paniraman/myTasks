import {Component} from 'react'

import uuid from 'react-uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tagList: tagsList,
    taskList: [],
    activeToggle: '',
    taskName: '',
    tagOptionId: '',
    tagOptionText: '',
  }

  toggling = id => {
    const {activeToggle} = this.state
    if (activeToggle === id) {
      this.setState({activeToggle: ''})
    } else {
      this.setState({activeToggle: id})
    }
  }

  taskNameText = event => {
    this.setState({taskName: event.target.value})
  }

  tagNameText = event => {
    const {tagList} = this.state

    const taskFilter = tagList.filter(
      obj => obj.optionId === event.target.value,
    )

    this.setState({
      tagOptionId: event.target.value,
      tagOptionText: taskFilter[0].displayText,
    })
  }

  addFun = event => {
    event.preventDefault()
    const {taskList, taskName, tagOptionId, tagOptionText} = this.state
    const taskObj = {
      optionId: uuid(),
      tagOptionId,
      displayText: tagOptionText,
      taskName,
    }
    this.setState({
      taskList: [...taskList, taskObj],
    })
  }

  render() {
    const {tagList, activeToggle, taskList, taskName} = this.state

    const taskFill = taskList.filter(obj => activeToggle === obj.tagOptionId)

    const taskFinal = activeToggle === '' ? taskList : taskFill

    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.addFun}>
            <label className="label-style" htmlFor="taskText">
              Task
            </label>
            <input
              type="text"
              onChange={this.taskNameText}
              id="taskText"
              value={taskName}
              placeholder="Enter the task here"
              className="input-style"
            />
            <label className="label-style" htmlFor="tagsItem">
              Tags
            </label>
            <select
              id="tagsItem"
              onChange={this.tagNameText}
              className="input-style"
            >
              {tagList.map(obj => (
                <option key={obj.optionId} value={obj.optionId}>
                  {obj.displayText}
                </option>
              ))}
            </select>
            <input type="submit" value="Add Task" className="btn-style" />
          </form>
        </div>
        <div className="right-container">
          <h1 className="label-style">Tags</h1>
          <ul className="top-list-container">
            <option value="SELECT">Select</option>
            {tagList.map(obj => (
              <li key={obj.optionId}>
                <button
                  onClick={() => {
                    this.toggling(obj.optionId)
                  }}
                  type="button"
                  className={
                    activeToggle === obj.optionId
                      ? 'activeItem'
                      : 'inactiveItem'
                  }
                >
                  {obj.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="label-style">Tasks</h1>
          {taskList.length === 0 ? (
            <div className="not-container">
              <p className="para">No Tasks Added Yet</p>{' '}
            </div>
          ) : (
            <ul className="task-container">
              {taskFinal.map(obj => (
                <li key={obj.optionId} className="task-item-style">
                  <div className="task-item-container">
                    <p className="task-name-item">{obj.taskName}</p>
                    <p className="tag-name-item">{obj.displayText}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
