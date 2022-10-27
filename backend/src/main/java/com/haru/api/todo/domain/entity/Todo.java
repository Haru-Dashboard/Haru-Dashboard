package com.haru.api.todo.domain.entity;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.common.entity.BaseEntity;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.user.domain.entity.User;
import lombok.*;

import javax.persistence.*;

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

    public static Todo create(TodoRequest.Create request, User user) {
        return Todo.builder()
                .user(user)
                .category(request.getCategory())
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
}
