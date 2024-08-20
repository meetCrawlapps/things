// src/MultilevelDragDrop.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Helper function to reorder items within the same list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const MultilevelDragDrop = () => {
  const [levels, setLevels] = useState([
    { id: "level-0", items: [{ id: "item-0" }] },
  ]);

  const addNewDiv = (levelIndex) => {
    const newLevels = [...levels];
    const newItem = { id: `item-${Date.now()}` };
    newLevels[levelIndex].items.push(newItem);
    setLevels(newLevels);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the item is dropped outside the list
    if (!destination) {
      return;
    }

    // Find the source and destination levels
    const startLevelIndex = levels.findIndex(
      (level) => level.id === source.droppableId
    );
    const endLevelIndex = levels.findIndex(
      (level) => level.id === destination.droppableId
    );

    if (startLevelIndex === endLevelIndex) {
      // Reorder items within the same level
      const newLevels = [...levels];
      const items = reorder(
        newLevels[startLevelIndex].items,
        source.index,
        destination.index
      );
      newLevels[startLevelIndex].items = items;
      setLevels(newLevels);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {levels.map((level, levelIndex) => (
        <Droppable key={level.id} droppableId={level.id} direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                margin: "20px",
                border: "1px solid black",
                padding: "10px",
                minHeight: "100px",
              }}
            >
              <button onClick={() => addNewDiv(levelIndex)}>Add New Div</button>
              {level.items.map((item, itemIndex) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={itemIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "16px",
                        margin: "4px",
                        border: "1px solid gray",
                        backgroundColor: "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      Draggable Div {itemIndex + 1}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default MultilevelDragDrop;
