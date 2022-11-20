package com.haru.api.file.exception;

import com.haru.api.common.exception.BusinessException;

public class S3Exception extends BusinessException {
    public S3Exception() {
        super("S3파일업로드에서 IOException이 발생했습니다.");
    }
}
