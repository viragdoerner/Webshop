package com.programwithvirag.restservice.RestApp.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
public class UpdateOrder{

    @NotNull
    private String newStatus;
    public UpdateOrder(){}

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }
}
