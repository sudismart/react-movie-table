import React from "react";

const ListGroup = props => {
  const {
    listItems: items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty
  } = props;
  return (
    <ul className="list-group mt-3">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item active list-item"
              : "list-group-item list-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
