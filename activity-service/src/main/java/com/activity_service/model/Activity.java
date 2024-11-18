package com.activity_service.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "activities")

public class Activity {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private Boolean available;
    private Date date;

    public Activity(String id, String name, String description,Double price,Boolean available,Date date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
        this.date = date;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setAdresse(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Boolean getAvailable() {return available;}
    public void setAvailable(Boolean available){this.available = available;}

    public Date getDate() {return date;}
    public void setDate(Date date) {this.date = date;}
    

}
