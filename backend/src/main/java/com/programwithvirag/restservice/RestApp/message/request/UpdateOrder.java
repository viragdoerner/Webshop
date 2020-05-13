package com.programwithvirag.restservice.RestApp.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
public class UpdateOrder{

    @NotBlank
    @Size(min=3, max = 60)
    private String newStatus;

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }
}
