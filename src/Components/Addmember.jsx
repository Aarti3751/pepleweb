import { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiEdit2 } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Addmember.css';
import { Container, Table, Modal, Button, Pagination } from "react-bootstrap";
import { FaArrowDown } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { RiDeleteBinLine } from "react-icons/ri";
import Edit from "./Edit";

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FilterModal from "./FilterModal";


const Addmember = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [teams, setTeams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Added state for search query

    const [showFilterModal, setShowFilterModal] = useState(false);
  

  // Function to handle the filter button click
  const handleFilterClick = () => {
    setShowFilterModal(true);  
  };

  // Function to close the filter modal
  const handleCloseModal = () => {
    setShowFilterModal(false); 
  };


    const [page, setPage] = useState(1);
    const itemsPerPage = 10;


    // Fetch members data from the API
    const getData = async () => {
        try {
            const response = await axios.get('https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Add new member
    const sendData = (e) => {
        e.preventDefault();
        axios.post('https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users', {
            image, name, role, email, teams
        })
            .then((response) => {
                setMembers([...members, response.data]); // Add new member to the list
                setImage("");
                setName("");
                setRole("");
                setEmail("");
                setTeams([]);
                setIsModalOpen(false); 
            })
            .catch((error) => {
                console.error("Error adding new member:", error);
            });
    };

    // Handle editing a member
    const handleEdit = (id) => {
        setEditId(id);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditId(null);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = (id) => {
        setMemberToDelete(id);
        setShowDeleteModal(true);
    };

    // Handle deleting a member
    const handleDelete = () => {
        axios.delete(`https://66fb96148583ac93b40c4df3.mockapi.io/aarti/users/${memberToDelete}`)
            .then(() => {
                setMembers(members.filter(member => member.id !== memberToDelete));
                setShowDeleteModal(false); // Close delete modal
            })
            .catch((error) => {
                console.error("Error deleting member:", error);
            });
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setMemberToDelete(null);
    };

    const handleRowClick = (person) => {
        setSelectedPerson(person);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(members.length / itemsPerPage);

    // Handle changing page
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Get paginated members
    const paginatedMembers = members.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Filter members based on search query
    const filteredMembers = paginatedMembers.filter(member =>
        (member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    return (
        <Container>
            <div className="peopledir-container border border-1 border-secondary p-1 mt-4" style={{ borderRadius: '8px' }}>
            <div className="peopledir-header d-flex justify-content-between align-items-center">

    <div className="peopledir-left d-flex align-items-center">
        <h1 className="me-3 mb-0 " style={{fontSize:'1.7rem'}}>Team Members</h1>  
        <div className="d-flex align-items-center">
            <div className="rounded-pill px-3" style={{ color: '#6941C6', backgroundColor: '#F9F5FF', border: '1px solid #E4E7EC' }}>
                {members.length} Users
            </div>
        </div>
    </div>
    <div className="peopledir-actions d-flex align-items-center">
      {/* Search Box */}
      <div className="input-group peopledir-search me-2">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="input-group-text search-icon">
          <BiSearch style={{ fontSize: '1.5rem', color: '#6941C6' }} />
        </span>
      </div>

      {/* Filter Button */}
      <button className="btn peopledir-filter me-2" onClick={handleFilterClick}>
        <FiFilter style={{ color: '#000' }} />
      </button>

      {/* Filter Modal */}
      <FilterModal show={showFilterModal} onClose={handleCloseModal} />

      {/* Add Member Button */}
      <button
        className="btn btn-primary peopledir-add-btn"
        onClick={() => setIsModalOpen(true)}
      >
        + ADD MEMBER
      </button>
    </div>
    </div>






                {/* Modal for Adding Member */}
                {isModalOpen && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Member</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={sendData}>
                                        {/* Form fields here */}

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
                                                    required
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
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <select
                                                    className="form-control custom-select"
                                                    id="role"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    required
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
                                                onChange={(e) => setTeams(Array.from(e.target.selectedOptions, option => option.value))}
                                                multiple
                                                required
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
                                                        <span key={index} className="team-tag">{team}</span>
                                                    ))
                                                    : "None"}
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table for Displaying Members */}
                <div className="people-table-container mt-4">
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Name <FaArrowDown /></th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Teams</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((member) => (
                                <tr key={member.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(member)}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={member.image || 'https://via.placeholder.com/50'}
                                                alt={member.name}
                                                className="rounded-circle me-2"
                                                style={{ width: '36px', height: '36px', objectFit: 'cover', }}
                                            />
                                            <div>
                                                <div>{member.name}</div>
                                                <div className="text-muted">@{member.name.split(' ')[0].toLowerCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <StatusBadge />
                                    </td>
                                    <td>{member.role || 'Developer'}</td>
                                    <td>{member.email || 'example@gmail.com'}</td>
                                    <td>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <div className="rounded-pill design">Design</div>
                                            <div className="rounded-pill product">Product</div>
                                            <div className="rounded-pill marketing">Marketing</div>
                                            <div className="rounded-pill plus">+4</div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-md"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                handleDeleteConfirm(member.id);
                                            }}
                                        >
                                            <RiDeleteBinLine />
                                        </button>

                                        {/* Edit Button */}
                                        <button
                                            className="btn btn-md"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent row click
                                                handleEdit(member.id);
                                            }}
                                        >
                                            <FiEdit2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>




                </div>
                {/* Pagination */}
                <Pagination className="custom-pagination">
                    <Pagination.Prev
                        className="custom-pagination-btn prev-btn"
                        onClick={() => changePage(page - 1)}
                        disabled={page === 1}
                    >
                        <FaArrowLeft /> Previous
                    </Pagination.Prev>

                    {/* Display numbers in pagination */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            className="custom-pagination-item"
                            active={i + 1 === page}
                            onClick={() => changePage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}

                    <Pagination.Next
                        className="custom-pagination-btn next-btn"
                        onClick={() => changePage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next <FaArrowRight />
                    </Pagination.Next>
                </Pagination>


            </div>








            <Modal show={selectedPerson !== null} onHide={() => setSelectedPerson(null)} centered>
                <Modal.Header style={{ background: '#2A5B7E' }} closeButton>
                    {selectedPerson && (
                        <div className='d-flex flex-row justify-content-between align-items-start w-100'>
                            <img
                                src={selectedPerson.image || 'https://via.placeholder.com/150'}
                                alt={selectedPerson.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '100%' }}
                            />
                            <section className='text-white px-4 py-2 rounded' style={{ flex: 1 }}>
                                <p className='fw-bold mb-1'>{selectedPerson.name}</p>
                                <section className='d-flex flex-row justify-content-between'>
                                    <div className=' text-white px-2 py-1 rounded' style={{ flex: 0 }}>
                                        <div className="text-white" style={{ fontSize: '0.7rem' }}>@{selectedPerson.name.split(' ')[0].toLowerCase()}</div>
                                        <p className='mb-0'>User</p>
                                    </div>
                                    <div style={{ borderLeft: '2px solid black', height: '46px' }}></div>

                                    <div className=' text-white px-2 py-1 rounded' style={{ flex: 1 }}>
                                        <p className='mb-0'>Product Designer</p>
                                        <p className='mb-0'>Role</p>
                                    </div>
                                </section>
                            </section>
                        </div>
                    )}
                </Modal.Header>
                <Modal.Body>
                    {selectedPerson && (
                        <div>
                            <p><strong>Date of Birth:</strong> {selectedPerson.dob || 'N/A'}</p>
                            <p><strong>Gender:</strong> {selectedPerson.gender || 'N/A'}</p>
                            <p><strong>Nationality:</strong> {selectedPerson.nationality || 'N/A'}</p>
                            <p><strong>Contact:</strong> {selectedPerson.contact || 'N/A'}</p>
                            <p><strong>Email Address:</strong> {selectedPerson.email || 'N/A'}</p>
                            <p><strong>Work Email Address:</strong> {selectedPerson.workemail || 'N/A'}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedPerson(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Modal for Editing Member */}
            <Modal
                show={showEditModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                keyboard={false}
                centered
            >
                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                {/* Modal Body */}
                <Modal.Body>
                    <Edit id={editId} handleClose={handleCloseEditModal} />
                </Modal.Body>
            </Modal>

            {/* Modal for Delete Confirmation */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Member Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Member details? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: '#6941C6' }} onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>



            
        </Container>
    );
};

export default Addmember;
