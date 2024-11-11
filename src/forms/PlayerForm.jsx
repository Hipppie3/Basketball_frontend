import React, {useState} from 'react'
import FormField from '../components/FormField.jsx'
import axios from 'axios'

function PlayerForm() {
 const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
 });
 

 const handleChange = (e) => {
  const { name, value} = e.target;
  setFormData((prevData) => ({...prevData, [name]: value}))
 }

 const submitPlayer = async (e) => {
 e.preventDefault();
  try {
   const response = await axios.post('/api/players', formData);
   console.log('Player added:', response.data);
   setFormData({ firstName: "", lastName: "" });
  } catch (error) {
   console.error('Error adding player:', error);
  }
 };
 
  return (
    <div>
      <h2>Player Form</h2>
      <form onSubmit={submitPlayer}>
      <FormField
      label="First Name"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange} />
      <FormField
      label="Last Name"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange} />
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PlayerForm
