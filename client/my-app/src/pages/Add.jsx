import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
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
      await axios.post('/students/placement/add', data)
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

  };
  return (
    <div className='auth'>
      <h1>ADD</h1>
      <form >
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
              <label htmlFor="stipend">Stipend</label>
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
        <button onClick={handleSubmit}>Add</button>
        {err && <p>{err}</p>}
      </form>
    </div>
  )
}

export default Add