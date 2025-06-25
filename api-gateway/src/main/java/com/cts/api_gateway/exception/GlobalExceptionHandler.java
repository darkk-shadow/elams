package com.cts.api_gateway.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {
    @ExceptionHandler(value=InvalidJwtTokenException.class)
    public ResponseEntity<ErrorResponseEntity> ResourceNotFound(
            InvalidJwtTokenException ex,
            WebRequest request
    ){
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        ErrorResponseEntity errorResponse = new ErrorResponseEntity(
                LocalTime.now(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false).replace("uri=",""),
                ex.getClass().getSimpleName()
        );
        return new ResponseEntity<>(errorResponse, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseEntity> exceptionHandler(
            Exception ex, WebRequest request
    ){
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponseEntity errorResponse = new ErrorResponseEntity(
                LocalTime.now(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false).replace("uri=",""),
                ex.getClass().getSimpleName()
        );
        return new ResponseEntity<>(errorResponse, status);
    }

}
