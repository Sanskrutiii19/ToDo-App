import React, { useState } from "react";
import "./style.css";

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the item being edited
  const [checklistMode, setChecklistMode] = useState(false); // Track if checklist mode is active

  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else {
      const newItem = {
        id: Date.now(),
        name: inputdata
      };
      setItems([...items, newItem]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const editItem = (id, newName) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const toggleEdit = (index) => {
    setEditIndex(index === editIndex ? -1 : index); // Toggle edit mode for the clicked item
  };

  const toggleChecklistMode = () => {
    setChecklistMode(!checklistMode); // Toggle between checklist mode and normal mode
    if (checklistMode) {
      setItems([]); // If switching to checklist mode, clear all items
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/unnamed.png" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="additems">
            <input
              type="text"
              placeholder="Add item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>
          <div className="Showitems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={curElem.name}
                      onChange={(event) => editItem(curElem.id, event.target.value)}
                    />
                  ) : (
                    <h4>{curElem.name}</h4>
                  )}
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => toggleEdit(index)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Showitems">
            <button className={`btn effect04 ${checklistMode ? 'checklist-btn' : ''}`} data-sm-link-text={checklistMode ? 'Remove All' : 'Check List'} onClick={toggleChecklistMode}>
              <span>{checklistMode ? 'Remove All' : 'Check List'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
