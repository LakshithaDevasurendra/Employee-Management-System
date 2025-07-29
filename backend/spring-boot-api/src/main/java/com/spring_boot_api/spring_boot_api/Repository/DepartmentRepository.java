// src/main/java/com/spring_boot_api/spring_boot_api/Repository/DepartmentRepository.java
package com.spring_boot_api.spring_boot_api.Repository;

import com.spring_boot_api.spring_boot_api.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
}