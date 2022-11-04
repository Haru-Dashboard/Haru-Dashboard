package com.haru.api.file.exception;

import com.haru.api.common.exception.InvalidValueException;

public class FileExtensionException extends InvalidValueException {
    public FileExtensionException() {
        super("잘못된 형식의 파일입니다.");
    }
}
