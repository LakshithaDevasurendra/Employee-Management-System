// src/main/java/com/spring_boot_api/spring_boot_api/Controller/DepartmentController.java
package com.spring_boot_api.spring_boot_api.Controller;

import com.spring_boot_api.spring_boot_api.Entity.Department;
import com.spring_boot_api.spring_boot_api.Repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository repo;

    // GET /api/departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return repo.findAll();
    }

    // GET /api/departments/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
        try {
            Department department = repo.findById(id).orElseThrow();
            return new ResponseEntity<>(department, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // POST /api/departments
    @PostMapping
    public ResponseEntity<Department> createDepartment(@Validated @RequestBody Department department) {
        repo.save(department);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    // PUT /api/departments/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Integer id, @Validated @RequestBody Department department) {
        try {
            Department existing = repo.findById(id).orElseThrow();
            existing.setName(department.getName());
            existing.setLocation(department.getLocation());
            repo.save(existing);
            return new ResponseEntity<>(existing, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE /api/departments/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
        if (!repo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}