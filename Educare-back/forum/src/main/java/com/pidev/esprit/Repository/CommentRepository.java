package com.pidev.esprit.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pidev.esprit.Entities.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Query("select comment from Comment comment where  comment.archive =:b and comment.is_a_post=:a")//JPQL
    List<Comment> selectHomePage(  @Param("b") Boolean b, @Param("a") Boolean a);
    List<Comment> findByParent_idCommAndArchiveIsFalse(Long parent_id);


}
