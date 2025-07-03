package com.jsp.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.Backend.Entity.User;

public interface UserRepository  extends JpaRepository<User, Integer>  {

	User findByEmailAndPassword(String email, String password);

}
