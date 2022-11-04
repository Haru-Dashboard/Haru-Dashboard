package com.haru.api;

import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import com.haru.api.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if(userRepository.findAll().isEmpty()){
            List<User> userList = new ArrayList<>();
            User admin = User.builder()
                    .email("admin@gmail.com")
                    .oauthId("1111")
                    .name("관리자")
                    .provider(SocialProvider.GOOGLE)
                    .role(Role.ADMIN)
                    .build();
            userList.add(admin);

            User user = User.builder()
                    .email("haru@gmail.com")
                    .oauthId("1234")
                    .name("김하루")
                    .provider(SocialProvider.GOOGLE)
                    .role(Role.USER)
                    .build();
            userList.add(user);
            userRepository.saveAll(userList);
        }
    }
}
