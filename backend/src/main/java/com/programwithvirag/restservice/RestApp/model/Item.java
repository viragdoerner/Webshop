package com.programwithvirag.restservice.RestApp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table
public class Item {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int itemId;
    @NotNull
    private String name;
    @NotNull
    private Integer price;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

}
