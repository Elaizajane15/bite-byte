package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public User create(User user) {
		user.setCreatedAt(LocalDateTime.now());
		return userRepository.save(user);
	}

	@Override
	public User findById(Long id) {
		Objects.requireNonNull(id, "id cannot be null");
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User update(Long id, User user) {
		User existing = findById(id);
		if (existing == null) return null;
		existing.setFirstname(user.getFirstname());
		existing.setLastname(user.getLastname());
		existing.setEmail(user.getEmail());
		// salt/hash password elsewhere
		existing.setPassword(user.getPassword());
		return userRepository.save(existing);
	}

	@Override
	public void delete(Long id) {
		Objects.requireNonNull(id, "id cannot be null");
		userRepository.deleteById(id);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}
}
