package com.haru.api.todo.domain.entity;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.common.entity.BaseEntity;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.user.domain.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "todo")
public class Todo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private String title;

    private Byte mon;
    private Byte tue;
    private Byte wed;
    private Byte thu;
    private Byte fri;
    private Byte sat;
    private Byte sun;

    public static Todo create(TodoRequest.Create request, Category category, User user) {
        return Todo.builder()
                .user(user)
                .category(category)
                .title(request.getTitle())
                .mon(request.getMon())
                .tue(request.getTue())
                .wed(request.getWed())
                .thu(request.getThu())
                .fri(request.getFri())
                .sat(request.getSat())
                .sun(request.getSun())
                .build();
    }

    public void update(TodoRequest.Update request, Category category) {
        this.category = category;
        this.title = request.getTitle();
        this.mon = request.getMon();
        this.tue = request.getTue();
        this.wed = request.getWed();
        this.thu = request.getThu();
        this.fri = request.getFri();
        this.sat = request.getSat();
        this.sun = request.getSun();
    }

}
