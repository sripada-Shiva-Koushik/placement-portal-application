import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AdminPlacementDelete = () => {

  const { id } = useParams();

  const [inputs, setInputs] = useState({
    username: "",
    company: "",
    salary: "",
    city: "",
    sid: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/students/placement/get/delete/${id}`);
        const data = res.data;
        setInputs({
          username: data.username,
          company: data.company,
          salary: data.salary,
          city: data.city,
          sid: data.id
        });
      } catch (err) {
        setError(err.response.data);
      }
    };
    fetchData();
  }, [id]);

  const [err, setError] = useState(null)
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate()

  const handleChange = async (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...inputs };
      await axios.delete(`http://localhost:8000/api/students/placement/delete/${id}`, data);
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };


  return (
    <div>
      <form className='form-container'>
        <div className='form-group'>
          <input type="text" placeholder='username' name='username' value={inputs.username} onChange={handleChange} disabled />
        </div>
        {/* <input type="text" placeholder='email' name='email' value={inputs.email} onChange={handleChange} /> */}
        <div className='form-group'>
          <input required type="text" placeholder='Company Name' name='company' value={inputs.company} onChange={handleChange} disabled />
        </div>
        <div className='form-group'>
          <input required type="number" placeholder='Salary' name='salary' value={inputs.salary} onChange={handleChange} disabled />
        </div>
        <div className='form-group'>
          <input required type="text" placeholder='City' name='city' value={inputs.city} onChange={handleChange} disabled />
        </div>
        <div className='form-group'>
          <input required type="number" placeholder='Register Number' name='sid' value={inputs.sid} onChange={handleChange} disabled />
        </div>
        <div className='form-group'>
          <button onClick={handleSubmit} className='form-submit'>DELETE</button>
        </div>
        {err && <p>{err}</p>}
      </form>
    </div>
  )
}


export default AdminPlacementDelete