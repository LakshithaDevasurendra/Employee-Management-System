// src/components/EmployeeList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/apiService';
import { Employee } from '../api/apiService';

interface EmployeeListProps {}

const EmployeeList: React.FC<EmployeeListProps> = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    salary: 0,
    departmentId: 0,
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      salary: 0,
      departmentId: 0,
    });
  };

  const handleEditClick = (employee: Employee) => {
    setShowModal(true);
    setIsEditing(true);
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone || '',
      salary: employee.salary,
      departmentId: employee.departmentId,
    });
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && selectedEmployee) {
      try {
        await updateEmployee(selectedEmployee.employeeId, {
          ...formData,
          employeeId: selectedEmployee.employeeId,
        });
        loadEmployees();
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
      try {
        await createEmployee(formData);
        loadEmployees();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    }

    setShowModal(false);
  };

  return (
    <div>
      <h2>Employees</h2>
      <Button variant="primary" onClick={handleAddClick}>
        Add Employee
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employeeId}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.salary}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEditClick(emp)}
                >
                  Edit
                </Button>
                {' '}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(emp.employeeId)}
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
            {isEditing ? 'Edit Employee' : 'Add Employee'}
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
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group controlId="departmentId">
              <Form.Label>Department ID</Form.Label>
              <Form.Control
                type="number"
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Add Employee'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeList;