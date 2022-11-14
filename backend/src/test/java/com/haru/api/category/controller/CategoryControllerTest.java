package com.haru.api.category.controller;

import com.haru.api.MvcTest;
import com.haru.api.category.domain.entity.Category;
import com.haru.api.category.service.CategoryService;
import com.haru.api.user.domain.Role;
import com.haru.api.user.domain.SocialProvider;
import com.haru.api.user.domain.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Category API 문서화")
@WebMvcTest(CategoryController.class)
public class CategoryControllerTest extends MvcTest {
    @MockBean
    private CategoryService categoryService;
    private Category category1, category2, category3;
    private final List<Category> categoryList = new ArrayList<>();

    @BeforeEach
    public void setUp() {
        User user = User.builder()
                .id(1L)
                .email("haru@gmail.com")
                .oauthId("111111")
                .name("김하루")
                .provider(SocialProvider.GOOGLE)
                .role(Role.USER)
                .build();
        category1 = Category.builder()
                .id(1L)
                .name("jpa study")
                .build();
        category2 = Category.builder()
                .id(2L)
                .name("dailystudy")
                .build();
        category3 = Category.builder()
                .id(3L)
                .name("star")
                .build();
        categoryList.add(category1);
        categoryList.add(category2);
        categoryList.add(category3);
    }

    @Test
    @DisplayName("카테고리 검색")
    public void searchCategory() throws Exception {
        List<String> response = new ArrayList<>();
        categoryList.stream().map(category -> response.add(category.getName())).collect(Collectors.toList());
        given(categoryService.search(any())).willReturn(response);

        ResultActions results = mvc.perform(get("/api/categories")
                .param("keyword", "st"));

        results.andExpect(status().isOk())
                .andDo(document("categories_search",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("keyword").description("검색어")
                        ),
                        responseFields(
                                fieldWithPath("[]").type(JsonFieldType.ARRAY).description("검색 결과")
                        )
                ));
        verify(categoryService).search(any());
    }
}
