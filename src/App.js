import { useEffect, useState } from 'react';
import './App.css'
function App() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);
  const [addupdate, setAddUpdate] = useState(false);
  const [updateID, setUpdateID] = useState()



  useEffect(() => {
    try {
      const storedData = localStorage.getItem('myData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading data from local storage:', error);
    }
  }, []);


  const handleAdd = (e) => {
    e.preventDefault()
    const newData = [...data, { id: id, name: name, email: email, number: number }];
    setData(newData)
    try {
      localStorage.setItem('myData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
    setId("")
    setEmail("")
    setName("")
    setNumber("")
  }
  const handleUpdate = (id) => {
    setUpdateID(id)
    const selectedItem = data.find((item, index) => index === id);
    if (selectedItem) {
      setId(selectedItem.id);
      setEmail(selectedItem.email);
      setName(selectedItem.name);
      setNumber(selectedItem.number);
      setAddUpdate(true)
    }

  }
  const handleDelete = (id) => {
    const updatedData = data.filter((item, index) => index !== id);
    setData(updatedData);

  }
  const handleAddUpdate = (e) => {
    e.preventDefault()

    if (addupdate) {
      // Update logic
      const updatedData = data.map((item, index) =>
        index === updateID
          ? { ...item, email, name, number }
          : item
      );
      console.log("Updated Data:", updatedData);
      setData(updatedData);
    } else {
      // Add logic
      const newData = [...data, { id, name, email, number }];
      console.log("New Data:", newData);
      setData(newData);
    }

    // Reset state after add/update
    setUpdateID(null);
    setId("");
    setEmail("");
    setName("");
    setNumber("");
    setAddUpdate(false);

  }
  return (
    <div className="App">
      <h1 className='heading'>React CRUD</h1>
      <div className="container">
        <div className='form-container'>
          <form className="form-id">
            <div className='form'>
              <label>Id</label>
              <input type="number" className="textbox" name="id" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className='form'>
              <label>Enter Name</label>
              <input type="text" className="textbox" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='form'>
              <label>Enter email</label>
              <input type="text" className="textbox" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form'>
              <label>Mobile number</label>
              <input type="text" className="textbox" name="number" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            <div className='button'>
              {
                addupdate === true ?
                  <button className="btn" onClick={handleAddUpdate} >Update</button>
                  :

                  <button className="btn" onClick={handleAdd}>Add +</button>
              }

            </div>
          </form>

        </div>
      </div>
      <div className='table-data'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  <button className='btn-update' onClick={() => handleUpdate(index)}>Edit</button>
                  <button className='btn-delete' onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>


      </div>
    </div>

  );
}

export default App;
