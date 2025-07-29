// src/components/DepartmentList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api/apiService';
import { Department } from '../api/apiService';

interface DepartmentListProps {}

const DepartmentList: React.FC<DepartmentListProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({
      name: '',
      location: '',
    });
  };

  const handleEditClick = (department: Department) => {
    setShowModal(true);
    setIsEditing(true);
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      location: department.location,
    });
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteDepartment(id);
      loadDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && selectedDepartment) {
      try {
        await updateDepartment(selectedDepartment.departmentId, {
          ...formData,
          departmentId: selectedDepartment.departmentId,
        });
        loadDepartments();
      } catch (error) {
        console.error('Error updating department:', error);
      }
    } else {
      try {
        await createDepartment(formData);
        loadDepartments();
      } catch (error) {
        console.error('Error creating department:', error);
      }
    }

    setShowModal(false);
  };

  return (
    <div>
      <h2>Departments</h2>
      <Button variant="primary" onClick={handleAddClick}>
        Add Department
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.departmentId}>
              <td>{dept.name}</td>
              <td>{dept.location}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEditClick(dept)}
                >
                  Edit
                </Button>
                {' '}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(dept.departmentId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Department' : 'Add Department'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Department'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DepartmentList;