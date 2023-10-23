package com.example.jwtprj.Service;

import com.example.jwtprj.domain.Role;
import com.example.jwtprj.domain.User;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User UpdateUser(User user , long id);
    User saveUser(User user);
    Role saveRole(Role role);

    void deleteRole (long id);
    void deleteUser (long id);

    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    Optional<User> getUserById(Long id);
    List<User>getUsers();
    List<Role>getRoles();
    public void sendPassMail(String userEmail) throws MessagingException, UnsupportedEncodingException;
    public void verifyPassToken(String token,String newPassword);

    User getUserByAccessToken(String accessToken);
}
