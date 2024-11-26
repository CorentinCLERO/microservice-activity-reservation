package com.activity_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.activity_service.model.Activity;
import com.activity_service.service.ActivityService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, String>> createActivity(@RequestBody Activity activity) {
        Map<String, String> response = new HashMap<>();
        // if (!isAdmin(authToken)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        try{
            Activity createdActivity = activityService.createActivity(activity);
            response.put("activityId", createdActivity.getId());
            response.put("message", "Activity created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch(IllegalArgumentException e){
            response.put("message", "Invalid data provided");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e){
            response.put("message", "An error occurred while creating the activity");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        
    }


    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable String id,@RequestBody Activity updatedActivity) {
        // if (!isAdmin(authToken)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        try {
            Activity updated = activityService.updateActivity(id, updatedActivity);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable String id) {
        // if (!isAdmin(authToken)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        try {
            activityService.deleteActivity(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String,String>> patchActivity(@PathVariable String id,@RequestBody Map<String,Boolean> requestBody ){
        Map<String,String> response = new HashMap<>();

        // if (!isAdmin(authToken)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        if(!requestBody.containsKey("available")){
            response.put("message", "Missing 'available' field in request body");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        try{
            Boolean available = requestBody.get("available");
            activityService.updateAvailability(id, available);
            response.put("message", "Availability updated");
            return ResponseEntity.ok(response);
        } catch(IllegalArgumentException e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }catch (Exception e) {
            response.put("message", "An error occurred while updating availability");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }
    // private boolean isAdmin(String authToken) {
    //     return authToken != null && authToken.contains("admin");
    // }
}
