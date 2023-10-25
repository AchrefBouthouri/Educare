package com.pidev.esprit.Services;

import com.pidev.esprit.Entities.Comment;

import java.util.List;

public interface ICommentService {
    List<Comment> retrieveAllComments();



    List<Comment> retrieveComments_SwitchParentarchive(boolean a, boolean b);

    List<Comment> retrieveComments_SwitchNotArchived(boolean b,boolean a);

    Comment updateComment (Comment c);


    Comment addCommentForumPage(Comment c) throws BadWordException;

    Comment reply_toComment(Comment c, Long idparent) throws BadWordException;

    Comment retrieveComment (Long idComment);
    void removeComment(Long idComment);

    void vote(Long id, String type);
}
