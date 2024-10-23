import React, { useState } from 'react';
import './FilterModal.css'; 
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterModal = ({ show, onClose }) => {
  const [rolesExpanded, setRolesExpanded] = useState(false);
  const [teamsExpanded, setTeamsExpanded] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const toggleRoles = () => setRolesExpanded(!rolesExpanded);
  const toggleTeams = () => setTeamsExpanded(!teamsExpanded);

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleTeamChange = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  if (!show) return null; // Prevent rendering the modal if 'show' is false

  return (
    <div className="filter-modal">
      <div className="filters">
        <h3>Filters</h3>
        <div>
          <div className="dropdown-header" onClick={toggleRoles}>
            <span>Roles</span>
            {rolesExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {rolesExpanded && (
            <div className="options">
              {['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'].map((role) => (
                <div key={role}>
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <label>{role}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="dropdown-header" onClick={toggleTeams}>
            <span>Teams</span>
            {teamsExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {teamsExpanded && (
            <div className="options">
              {['Design', 'Product', 'Marketing', 'Technology'].map((team) => (
                <div key={team}>
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team)}
                    onChange={() => handleTeamChange(team)}
                  />
                  <label>{team}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="select-button" onClick={onClose}>SELECT</button>
    </div>
  );
};

export default FilterModal;
