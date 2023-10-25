package com.pidev.esprit.RestController;

import com.pidev.esprit.DTO.UserDto;
import com.pidev.esprit.Entities.Comment;
import com.pidev.esprit.Services.BadWordException;
import com.pidev.esprit.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/forum")

public class CommentController {
    @Autowired
    CommentService commentService ;

    @GetMapping("/")
    public List<Comment> retrieveAllComments() // get all comments with archive =0 and post = 1
    {
        return commentService.retrieveComments_SwitchNotArchived(false,true);
    }
    @PostMapping("/NewPost") // post a new post -> sets is_post as true and parent as true
    public  Comment NewPost(@RequestBody Comment comment) throws BadWordException {
        return commentService.addCommentForumPage(comment);
    }
    @PostMapping("/reply")
    public  Comment ReplytoComment (@RequestBody Comment contrat,@RequestParam Long idParent) throws BadWordException {
        return commentService.reply_toComment(contrat,idParent);
    }
    @GetMapping("/HomePage")// gets the the subcomments of a comment by id
    public List<Comment> homepage(@RequestParam Long idParent)
    {
        return commentService.getAllCommentsAndSubComments(idParent);
    }
    @PostMapping("/{id}/vote")// votes a comment with like dislike report type in the request
    public void vote(@PathVariable Long id, @RequestParam String type) {
        commentService.vote(id,type);
    }
    @GetMapping("/current-user")
    public ResponseEntity<UserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String username = authentication.getName();
        // Make a REST call to the user app to retrieve the user information
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<UserDto> responseEntity = restTemplate.exchange("http://localhost:8080/api/users" + username, HttpMethod.GET, null, UserDto.class);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            UserDto userDto = responseEntity.getBody();
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
