package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User payload) {
		if (payload.getEmail() == null || payload.getPassword() == null) return ResponseEntity.badRequest().build();
		User found = userService.findByEmail(payload.getEmail());
		if (found == null) return ResponseEntity.status(401).build();
		if (!found.getPassword().equals(payload.getPassword())) return ResponseEntity.status(401).build();
		return ResponseEntity.ok(found);
	}
}
