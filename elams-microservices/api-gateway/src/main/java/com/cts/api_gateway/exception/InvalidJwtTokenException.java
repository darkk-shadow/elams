package com.cts.api_gateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class InvalidJwtTokenException extends RuntimeException{
    public InvalidJwtTokenException(String msg){
        super(msg);
    }
}
