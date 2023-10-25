package com.pidev.esprit.Services;


import com.pidev.esprit.Entities.Comment;
import com.pidev.esprit.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;



import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService implements ICommentService {
    @Autowired
    CommentRepository commentRepository;


    @Override
    public List<Comment> retrieveAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> retrieveComments_SwitchParentarchive(boolean a, boolean b) {
        return null;
    }

    @Override
    public List<Comment> retrieveComments_SwitchNotArchived(boolean b,boolean a) {
        //a:true -> Parent Comment
        //b : true -> is Archived
        return commentRepository.selectHomePage(b,a);
    }

    public List<Comment> getAllCommentsAndSubComments(Long idParent) {
        List<Comment> topLevelComments = commentRepository.findByParent_idCommAndArchiveIsFalse(idParent);
        return fetchSubComments(topLevelComments);
    }

    private List<Comment> fetchSubComments(List<Comment> comments) {
        List<Comment> result = new ArrayList<>();
        for (Comment comment : comments) {
            List<Comment> subComments = commentRepository.findByParent_idCommAndArchiveIsFalse(comment.getIdComm());
            comment.setSubComments(fetchSubComments(subComments));
            result.add(comment);
        }
        return result;
    }

    @Override
    public Comment updateComment(Comment c) {
        Comment copy = c;

        copy.set_edited(true);
        commentRepository.save(copy);
        c.setId_previous(copy.getIdComm());

        c.set_edited(false);
        c.setCreatedAt(LocalDate.now());
        return commentRepository.save(c);
    }

    @Override
    public Comment addCommentForumPage(Comment c) throws BadWordException {

        c.setCreatedAt(LocalDate.now());
        c.setArchive(false);
        c.setIs_parent(true);
        c.setParent_id(null);
        c.set_edited(false);
        c.setIs_a_post(true); // this  a post in the homapage
        c.set_edited(false);
        c.setUpvotes(0);
        c.setReports(0);
        c.setDownvotes(0);

        if (c.containsBadWords()) {
            throw new BadWordException("Comment contains bad words and is not allowed.");
        }
        return commentRepository.save(c);
    }

    @Override
    public Comment reply_toComment(Comment c, Long idparent) throws BadWordException {
        Comment comment = commentRepository.findById(idparent).orElse(null);
        if (comment != null) {
            c.setParent(comment);
            c.setCreatedAt(LocalDate.now());

            c.setArchive(false);
            c.setIs_parent(false);
            c.set_edited(false);
            c.setIs_a_post(false);
            c.setUpvotes(0);
            c.setReports(0);
            c.setDownvotes(0);
            comment.setIs_parent(true);
            commentRepository.save(c);
            if (c.containsBadWords()) {
                throw new BadWordException("Comment contains bad words and is not allowed.");
            }
            return commentRepository.save(comment);
        } else return null;
    }

    @Override
    public Comment retrieveComment(Long idComment) {
        return null;
    }

    @Override
    public void removeComment(Long idComment) {

    }

    @Override
    public void vote(Long id, String type) {
        Comment comment = commentRepository.findById(id).orElseThrow(null);
        if ("like".equals(type)) {
            comment.like();
        } else if ("dislike".equals(type)) {
            comment.dislike();
        } else if ("report".equals((type))) {
            comment.report();
        }
        commentRepository.save(comment);
    }

    /*private OAuth2RestTemplate oAuth2RestTemplate;

    public String getConnectedUserData() {
        String userInfoUrl = "http://user-service/users/me";
        String result = oAuth2RestTemplate.getForObject(userInfoUrl, String.class);
        return result;
    }

*/

}