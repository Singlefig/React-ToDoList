import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import './App.css';
import { testData } from './constants/list';
import folderImg from './assets/icons/folder.png';
import arrowImg from './assets/icons/arrow.svg';
import trashImg from './assets/icons/trash.png';

const App = () => {
  const [items, setItems] = useState(testData);
  const [addItem, setAddItem] = useState({
    title: '',
    description: '',
    author: '',
    checked: false,
  });
  const [addFolder, setAddFolder] = useState('');

  const handleOnArrowClick = (folderIndex: number) => {
    const newFolder = items[folderIndex];
    newFolder.isOpened = !newFolder.isOpened;
    const newItems = [...items];
    newItems[folderIndex] = newFolder;
    setItems([...newItems]);
  };

  const handleOnCheckboxClick = (
    el: {
      folder: string,
      isOpened: boolean,
      items: Array<{
        title: string,
        description: string,
        author: string,
        checked: boolean,
      }>
    },
    folderIndex: number,
    index: number
  ) => {
    const newItem = el.items[index];
    newItem.checked = !newItem.checked;
    const newItems = [...items];
    newItems[folderIndex].items[index] = newItem;
    setItems([...newItems]);
  };

  const handleOnAddItemButtonClick = (folderIndex: number) => {
    if (!addItem.title || !addItem.description || !addItem.author) {
      return;
    }
    const newItems = [...items];
    newItems[folderIndex].items.push(addItem);
    clearAddItem();
    setItems([...newItems]);
  };

  const clearAddItem = () => {
    addItem.title = '';
    addItem.description = '';
    addItem.author = '';
  };

  const handleOnAddFolderButtonClick = () => {
    const newFolder = {
      folder: addFolder,
      items: [],
      isOpened: false,
    };

    const newItems = [...items];
    newItems.push(newFolder);
    setItems([...newItems]);
    setAddFolder('');
  };

  const handleOnItemDeleteClick = (folderIndex: number, index: number) => {
    console.log(folderIndex, index);
    const newItems = [...items];
    newItems[folderIndex].items.splice(index, 1);
    setItems([...newItems]);
  };

  const handleOnFolderDeleteClick = (folderIndex: number) => {
    let newItems = [...items];
    newItems.splice(folderIndex, 1);
    setItems([...newItems]);
  };

  return (
    <div className="App">
      <header className="header-container">
        <p>To Do List</p>
      </header>
      <main className="main-container">
        {items.map((el, folderIndex) => {
          return (
            <div key={el.folder} className="folder">
              <div className="folder-info">
                <img alt="folder icon" src={folderImg} width="24px" height="24px" />
                <p className="folder-title">{el.folder}</p>
                <hr className="divider-horizontal" />
                <img
                  alt="arrow icon"
                  src={arrowImg}
                  width="10px"
                  height="8px"
                  className="icon"
                  onClick={() => handleOnArrowClick(folderIndex)}
                />
                <img
                alt="trash icon"
                className="trash-icon icon"
                src={trashImg}
                width="16px"
                height="16px"
                onClick={() => handleOnFolderDeleteClick(folderIndex)}
                />
              </div>
              <Collapse isOpened={el.isOpened}>
                <div className="items">
                  {el.items.map((item, index) => {
                    return (
                      <div key={item.title} className="folder-item">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleOnCheckboxClick(el, folderIndex, index)} />
                        <div className="item-fields">
                          <p className="item-title">{item.title}</p>
                          <span className="item-description">{item.description}</span>
                          <span className="item-author">{item.author}</span>
                        </div>
                        <img
                        alt="trash icon"
                        className="trash-icon icon"
                        src={trashImg}
                        width="16px"
                        height="16px"
                        onClick={() => handleOnItemDeleteClick(folderIndex, index)}
                        />
                      </div>
                    );
                  })}
                  <div className="add-item-input">
                    <label htmlFor="add-title">Title:</label>
                    <input name="add-title" type="text" placeholder="Title" value={addItem.title} onChange={(e) => setAddItem({ ...addItem, title: e.target.value })} />
                    <label htmlFor="add-description">Description:</label>
                    <input name="add-description" type="text" placeholder="Description" value={addItem.description} onChange={(e) => setAddItem({ ...addItem, description: e.target.value })} />
                    <label htmlFor="add-author">Author:</label>
                    <input name="add-author" type="text" placeholder="Author" value={addItem.author} onChange={(e) => setAddItem({ ...addItem, author: e.target.value })} />
                    <button onClick={() => handleOnAddItemButtonClick(folderIndex)} type="button">Add Task</button>
                  </div>
                </div>
              </Collapse>
            </div>
          );
        })}
        <div className="add-folder-input">
          <label htmlFor="add-folder">Folder Name:</label>
          <input name="add-folder" type="text" placeholder="Write a folder name" value={addFolder} onChange={(e) => setAddFolder(e.target.value)} />
          <button onClick={() => handleOnAddFolderButtonClick()} type="button">Add Folder</button>
        </div>
      </main>
    </div>
  );
}

export default App;
