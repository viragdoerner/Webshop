package com.programwithvirag.restservice.RestApp.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;


@Entity
@Table(name = "orders")
public class Ordermodel{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String date;

    @Size(min=2, max=50)
    private String status;

    private int sum;


    private String username;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Item> items;

    public Ordermodel( @JsonProperty("username") String username,
                  @JsonProperty("items") List<Item> items){
        this.date = "most";
        this.status = "megrendelve";
        this.username = username;
        this.items = items;
        this.sum = 0;
    }
    public Ordermodel(){
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getSum() {
        this.sum=0;
        for(int i =0; i< this.items.size();i++){
            this.sum += this.items.get(i).getPrice();
        }
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    public Integer getId() {
        return id;
    }


}

