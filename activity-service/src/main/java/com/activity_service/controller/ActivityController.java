package com.activity_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.activity_service.model.Activity;
import com.activity_service.service.ActivityService;

import java.util.List;

@RestController
@RequestMapping("/api/activities") 
public class ActivityController {


    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }


    @GetMapping
    public List<Activity> getAvailableActivities() {
        return activityService.getAvailableActivities();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable String id) {
        return activityService.getActivityById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); 
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity,@RequestHeader("Authorization") String authToken) {
        if (!isAdmin(authToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Activity createdActivity = activityService.createActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdActivity);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable String id,@RequestBody Activity updatedActivity,@RequestHeader("Authorization") String authToken) {
        if (!isAdmin(authToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            Activity updated = activityService.updateActivity(id, updatedActivity);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable String id,@RequestHeader("Authorization") String authToken) {
        if (!isAdmin(authToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            activityService.deleteActivity(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private boolean isAdmin(String authToken) {
        return authToken != null && authToken.contains("admin");
    }
}
