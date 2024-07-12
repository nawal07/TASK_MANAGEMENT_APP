import { useState } from 'react';
import './App.css';

const App = () => {
  const [add, setAdd] = useState(false);
  const [input, setInput] = useState({ title: '', desc: '', status: 'all' });
  const [list, setList] = useState([]);

  let dis = 'none';
  const openAddTask = () => {
    setAdd(!add);
    console.log('fulll', list);
    console.log('ALL', allList);
    console.log('ONGOING', ongoingList);
    console.log('DONE', doneList);
  };

  const ontype = (e, key) => {
    setInput({ ...input, [key]: e.target.value });
    console.log(input);
  };

  const addTask = () => {
    if (input.title && input.desc) {
      setList([...list, input]);
      setInput({ title: '', desc: '', status: 'all' });
      setAdd(!add);
    }
  };

  const deleteTask = (index, key) => {
    if (key == 'ongoing') {
      const cpy = [...allList];
      const newList = [...list];
      newList.map((item, i) => {
        if (item.title === cpy[index].title && item.desc === cpy[index].desc) {
          newList.splice(i, 1);
        }
      });
      setList(newList);
    }
    if (key == 'done') {
      const cpy = [...ongoingList];
      const newList = [...list];
      newList.map((item, i) => {
        if (item.title === cpy[index].title && item.desc === cpy[index].desc) {
          newList.splice(i, 1);
        }
      });
      setList(newList);
    }

    if (key == 'delete') {
      const cpy = [...doneList];
      const newList = [...list];
      newList.map((item, i) => {
        if (item.title === cpy[index].title && item.desc === cpy[index].desc) {
          newList.splice(i, 1);
        }
      });
      setList(newList);
    }
  };

  if (add) {
    dis = 'block';
  }

  const newList = (index, key) => {
    console.log('1', list[index]);
    if (key == 'ongoing') {
      const listCopy = [...allList];
      listCopy[index] = { ...listCopy[index], status: key };
      const newList = [...list];
      newList.map((item, i) => {
        if (
          item.title === listCopy[index].title &&
          item.desc === listCopy[index].desc
        ) {
          newList.splice(i, 1, listCopy[index]);
        }
      });
      console.log('I', index);
      setList(newList);
    }
    if (key == 'done') {
      const listCopy = [...ongoingList];
      listCopy[index] = { ...listCopy[index], status: key };
      const newList = [...list];
      newList.map((item, i) => {
        if (
          item.title === listCopy[index].title &&
          item.desc === listCopy[index].desc
        ) {
          newList.splice(i, 1, listCopy[index]);
        }
      });
      console.log('I', index);
      setList(newList);
    }
  };

  var allList = list.filter(item => {
    return item.status == 'all';
  });

  var ongoingList = list.filter(item => {
    return item.status == 'ongoing';
  });

  var doneList = list.filter(item => {
    return item.status == 'done';
  });

  return (
    <>
      <div className="task-management">
        <div className="tm-head-panel">
          <h2>TASK MANAGER</h2>
          <button className="tm-add-button" onClick={openAddTask}>
            +
          </button>
        </div>
        <div className="tm-body">
          <div style={{ display: dis }} className="tm-add-task">
            <h3>Add Task</h3>
            <div className="tm-add-task-body">
              <h4 className="tm-add-task-body-contents">Title</h4>
              <input
                className="tm-add-task-body-contents"
                type="text"
                onChange={e => {
                  ontype(e, 'title');
                }}
                value={input.title}
              />
              <h4 className="tm-add-task-body-contents">Description</h4>
              <textarea
                className="tm-add-task-body-contents"
                onChange={e => {
                  ontype(e, 'desc');
                }}
                value={input.desc}
              />
              <button className="tm-add-task-body-contents" onClick={addTask}>
                ADD
              </button>
            </div>
          </div>
          <div className="tm-all-task">
            <div className="tm-all-task-contents">
              <h2>ALL TASKS </h2>
              {allList.map((item, index) => {
                return (
                  <div className="tm-all-task-card" key={index}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => {
                        deleteTask(index, 'ongoing');
                      }}
                    ></i>
                    <button
                      onClick={() => {
                        newList(index, 'ongoing');
                      }}
                    >
                      Ongoing
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="tm-ongoing-task">
            <div className="tm-ongoing-task-contents">
              <h2>ONGOING TASKS </h2>
              {ongoingList.map((item, index) => {
                return (
                  <div className="tm-ongoing-task-card" key={index}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => {
                        deleteTask(index, 'done');
                      }}
                    ></i>
                    <button
                      onClick={() => {
                        newList(index, 'done');
                      }}
                    >
                      Done
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="tm-done-task">
            <div className="tm-done-task-contents">
              <h2>COMPLETED TASKS </h2>
              {doneList.map((item, index) => {
                return (
                  <div className="tm-done-task-card" key={index}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <button
                      onClick={() => {
                        deleteTask(index, 'delete');
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
