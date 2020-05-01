package com.programwithvirag.restservice.RestApp.exception;

public class ItemNotFoundException extends RuntimeException {

        public ItemNotFoundException(String message){
            super(message);
        }

}
