import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editColors, deleteColors, addColors } from "../actions/colors";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = () => {
  const colors = useSelector(state => state.colorsReducer.colorList);
  const { isFetching, error } = useSelector(state => state.colorsReducer);
  console.log(colors);

  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    dispatch(editColors(colorToEdit));
    setEditing(false);

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    dispatch(deleteColors(color))
  };


  const addColor = e => {
    e.preventDefault();

    
    if(newColor.color && !colors.find(color => (color.color === newColor.color || color.code.hex === newColor.code.hex))){
      dispatch(addColors(newColor));
      setNewColor(initialColor);
    }
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      {isFetching && <p>Loading Colors...</p>}
      {(!isFetching) && (
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={e => {
                      e.stopPropagation();
                      deleteColor(color)
                    }
                  }>
                    x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
      )}
      {(!isFetching && error.length > 0) && <p>{error}</p>}
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}


      {/* stretch - build another form here to add a color */}
      <form onSubmit = {addColor} >
        <legend>Add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
          <button onClick={e => {e.preventDefault(); setNewColor(initialColor)}}>cancel</button>
        </div>
      </form>

      <div className="spacer" />
      
      
    </div>
  );
};

export default ColorList;
