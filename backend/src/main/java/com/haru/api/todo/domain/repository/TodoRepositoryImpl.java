package com.haru.api.todo.domain.repository;

import com.haru.api.todo.domain.entity.Todo;
import com.haru.api.user.domain.entity.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.haru.api.todo.domain.entity.QTodo.todo;

@RequiredArgsConstructor
public class TodoRepositoryImpl implements TodoRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Todo> findAllByUserAndDay(User user, String day) {
        BooleanBuilder builder = new BooleanBuilder();
        switch (day) {
            case "mon":
                builder.and(todo.mon.eq((byte) 1));
                break;
            case "tue":
                builder.and(todo.tue.eq((byte) 1));
                break;
            case "wed":
                builder.and(todo.wed.eq((byte) 1));
                break;
            case "thu":
                builder.and(todo.thu.eq((byte) 1));
                break;
            case "fri":
                builder.and(todo.fri.eq((byte) 1));
                break;
            case "sat":
                builder.and(todo.sat.eq((byte) 1));
                break;
            case "sun":
                builder.and(todo.sun.eq((byte) 1));
                break;
            default:
                break;
        }
        return jpaQueryFactory.selectFrom(todo)
                .where(todo.user.eq(user),
                    builder)
                .fetch();
    }
}
