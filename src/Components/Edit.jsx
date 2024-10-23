import axios from "axios";
import { useEffect, useState } from "react";
import  './Addmember.css'

const Edit = ({ id, handleClose }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState([]);

  // Fetch existing member data based on id
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users/${id}`);
        setImage(res.data.image);
        setName(res.data.name);
        setRole(res.data.role);
        setEmail(res.data.email);
        setTeams(res.data.teams || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  // Handle form submission
  const updated = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users/${id}`, { image, name, email, role, teams });
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update member", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={updated}>
        {/* Row for Image and Name input fields */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control custom-input"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control custom-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              
            />
          </div>
        </div>

        {/* Row for Email and Role input fields */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="email"
              className="form-control custom-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control custom-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              
            >
              <option value="">Select Role</option>
              <option value="Product Designer">Product Designer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
            </select>
          </div>
        </div>

        {/* Teams input */}
        <div className="mb-4">
          <select
            className="form-control custom-select"
            id="teams"
            value={teams}
            onChange={(e) => setTeams(Array.from(e.target.selectedOptions, (option) => option.value))}
            multiple
            
          >
            <option value="">Select Team(s)</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Display selected teams in rectangular format */}
        <div className="mb-4">
          <div className="selected-teams">
            {teams.length > 0 ?
              teams.map((team, index) => (
                <span key={index} className="badge bg-secondary me-2 team-tag">{team}</span>
              ))
              : <span className="no-teams">None</span>}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
};

export default Edit;
