import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  // const { id } = useParams();
  const [inputs, setInputs] = useState({
    company: "",
    salary: "",
    city: "",
    sid: "",
    from: "",
    to: "",
    stipend: "",
    iid: "",
  })
  const [err, setError] = useState(null)
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate()

  const handleChange = async (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const table = document.getElementById('plac-intern').value;
      const data = { table, ...inputs };
      await axios.put('http://localhost:8000/api/students/admin/placement', data)
      navigate("/home");
    } catch (err) {
      setError(err.response.data);
    }
  };

  // const  handleSelect = (e) => {
  //   const value = e.target.value;
  //   if(value === 'Placement'){
  //     setInputs({
  //       company: '',
  //       salary: '',
  //       city: '',
  //       sid: '',
  //     })
  //   } else if (value === 'Intership'){
  //     setInputs({
  //       company: '',
  //       from: '',
  //       to: '',
  //       stipend: '',
  //       iid: '',
  //     })
  //   }
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value)
    if (value === "Placement") {
      setInputs((prev) => ({
        ...prev,
        from: "",
        to: "",
        stipend: "",
        iid: "",
      }))
    } else if (value === "Internship") {
      setInputs((prev) => ({ ...prev, sid: "" }));
    }

  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:8000/api/students/placement/get/${id}`);
  //       const data = res.data;
  //       setInputs({
  //         // ...data,
  //         // sid: data.id,
  //         // username: data.username,
  //         username: data.username,
  //         email: data.email,
  //         company: data.company,
  //         salary: data.salary,
  //         city: data.city,
  //         sid: data.id,

  //       });
  //     } catch (err) {
  //       setError(err.response.data);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  // const Update = () => {
  return (
    <div className='auth'>
      <h1>Update</h1>
      <form className='form-container'>
        <select id='plac-intern' onChange={handleDropdownChange}>
          <option>Choose an option</option>
          <option>Placement</option>
          <option>Internship</option>
        </select>
        <div className='form-group'>
          <label htmlFor="company">Company Name</label>
          <input required type="text" placeholder='Company Name' name='company' value={inputs.company} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="salary">Salary</label>
          <input required type="number" placeholder='Salary' name='salary' value={inputs.salary} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="city">City</label>
          <input required type="text" placeholder='City' name='city' value={inputs.city} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="sid">Register Number</label>
          <input required type="number" placeholder='Register Number' name='sid' value={inputs.sid} onChange={handleChange} />
        </div>

        {selectedOption === "Internship" && inputs.sid === "" && (
          <>
            {/* <input required type='number' placeholder='Register Number' name='sid' onChange={handleChange} /> */}
            <div className='form-group'>
              <label htmlFor="from">From</label>
              <input type='text' placeholder='From' name='from' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="to">To</label>
              <input type='text' placeholder='To' name='to' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="stipent">Stipend</label>
              <input type='number' placeholder='Stipend' name='stipend' onChange={handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="iid">Register Number</label>
              <input type='text' placeholder='Internship ID' name='iid' onChange={handleChange} />
            </div>
          </>
        )}


        {/* {inputs.from && <input required type='text' placeholder='From' name='from' value={inputs.from} onChange={handleChange} />}
        {inputs.to && <input required type='text' placeholder='To' name='to' value={inputs.to} onChange={handleChange} />}
        {inputs.stipend && <input required type='number' placeholder='Stipend' name='stipend' value={inputs.stipend} onChange={handleChange} />}
        {inputs.iid && <input required type='number' placeholder='IID' name='iid' value={inputs.iid} onChange={handleChange} />} */}
        <button onClick={handleSubmit} className='form-submit'>Update</button>

        {err && <p>{err}</p>}
      </form>
    </div>
  )
}

export default Update