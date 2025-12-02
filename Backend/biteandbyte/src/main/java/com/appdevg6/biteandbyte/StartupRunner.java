package com.appdevg6.biteandbyte;

import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(StartupRunner.class);
    private final UserRepository userRepository;

    public StartupRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("StartupRunner: Checking DB connectivity...");
        if (userRepository.findByEmail("init@example.com").isEmpty()) {
            User user = new User();
            user.setFirstname("Init");
            user.setLastname("User");
            user.setEmail("init@example.com");
            user.setPassword("pass");
            userRepository.save(user);
            log.info("StartupRunner: Saved user id={} email={}", user.getId(), user.getEmail());
        } else {
            log.info("StartupRunner: Seed user already exists");
        }
    }
}
