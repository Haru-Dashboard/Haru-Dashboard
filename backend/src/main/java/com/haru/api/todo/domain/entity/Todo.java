package com.haru.api.todo.domain.entity;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.common.entity.BaseEntity;
import com.haru.api.todo.dto.TodoRequest;
import com.haru.api.user.domain.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    @ColumnDefault("false")
    private boolean mon;
    @ColumnDefault("false")
    private boolean tue;
    @ColumnDefault("false")
    private boolean wed;
    @ColumnDefault("false")
    private boolean thu;
    @ColumnDefault("false")
    private boolean fri;
    @ColumnDefault("false")
    private boolean sat;
    @ColumnDefault("false")
    private boolean sun;

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
        if (category != null) this.category = category;
        if (request.getTitle() != null) this.title = request.getTitle();
        if (request.getMon() != null) this.mon = request.getMon();
        if (request.getTue() != null) this.tue = request.getTue();
        if (request.getWed() != null) this.wed = request.getWed();
        if (request.getThu() != null) this.thu = request.getThu();
        if (request.getFri() != null) this.fri = request.getFri();
        if (request.getSat() != null) this.sat = request.getSat();
        if (request.getSun() != null) this.sun = request.getSun();
    }

}
