package com.jsp.Backend.controller;

import org.springframework.web.bind.annotation.*;
import com.jsp.Backend.Entity.User;
import com.jsp.Backend.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    // Constructor Injection
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElse(null);
    }

    // ✅ Update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
            .map(user -> {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                user.setPassword(updatedUser.getPassword());
                return userRepository.save(user);
            }).orElse(null);
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }

    // ✅ Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        String email = loginData.getEmail();
        String password = loginData.getPassword();

        User user = userRepository.findByEmailAndPassword(email, password);

        if (user != null) {
            return ResponseEntity.ok(user);  // ✅ Login successful
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid email or password");  // ❌ Login failed
        }
    }
}








//import org.springframework.web.bind.annotation.*;
//import com.jsp.Backend.Entity.User;
//import com.jsp.Backend.Repository.UserRepository;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "*") 
//@RequestMapping("/api/user")
//public class UserController {
//
//    private final UserRepository userRepository;
//
//    public UserController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userRepository.save(user);
//    }
//
//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable int id) {
//        return userRepository.findById(id).orElse(null);
//    }
//
//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable int id, @RequestBody User updatedUser) {
//        return userRepository.findById(id)
//            .map(user -> {
//                user.setName(updatedUser.getName());
//                user.setEmail(updatedUser.getEmail());
//                user.setPassword(updatedUser.getPassword());
//                return userRepository.save(user);
//            }).orElse(null);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable int id) {
//        userRepository.deleteById(id);
//    }
//    
//    
//}


