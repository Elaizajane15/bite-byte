package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
	private final UserService userService;

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User payload) {
		String email = payload.getEmail() == null ? null : payload.getEmail().trim().toLowerCase();
		String password = payload.getPassword() == null ? null : payload.getPassword().trim();
		if (email == null || password == null || email.isEmpty() || password.isEmpty()) return ResponseEntity.badRequest().build();
		User found = userService.findByEmail(email);
		if (found == null) return ResponseEntity.status(401).build();
		if (!password.equals(found.getPassword())) return ResponseEntity.status(401).build();
		return ResponseEntity.ok(found);
	}
}
