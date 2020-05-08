package com.programwithvirag.restservice.RestApp.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Order{

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int orderId;

    @NotNull
    private LocalDate date;
    @NotNull
    private Integer sum;
    private String status;

    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @NotNull
    @OneToMany(cascade = CascadeType.ALL)
    private List<Item> items;

    public Order( @JsonProperty("user") User user,
                 @JsonProperty("items") List<Item> items){

        this.date = LocalDate.now();
        this.status = "megrendelve";
        this.user = user;
        this.items = items;
        this.sum = 0;
        for(int i =0; i< this.items.size();i++){
            this.sum += this.items.get(i).getPrice();
        }
    }
    public Order() {
        this.date = null;
        this.sum = null;
        this.status = null;
        this.user = null;
        this.items = null;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

}
