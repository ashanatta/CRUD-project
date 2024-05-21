import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Formtable from "./commponets/Formtable";

axios.defaults.baseURL = "http://localhost:8080/";
function App() {
  const [AddSection, setAddSection] = useState(false);
  const [EditSection, setEditSection] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    Age: "",
  });
  const [FormDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    Age: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", FormData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      getfFetchData();
      alert(data.data.message);
    }
  };
  const getfFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getfFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getfFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/updated/", FormDataEdit);
    if (data.data.success) {
      getfFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {AddSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={FormData}
          />
        )}
        {EditSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={FormDataEdit}
          />
        )}
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.Age}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </button>
                      |
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
