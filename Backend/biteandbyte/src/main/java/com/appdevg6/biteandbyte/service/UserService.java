package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.User;

import java.util.List;

public interface UserService {
	User create(User user);
	User findById(Long id);
	List<User> findAll();
	User update(Long id, User user);
	void delete(Long id);
	User findByEmail(String email);
}
