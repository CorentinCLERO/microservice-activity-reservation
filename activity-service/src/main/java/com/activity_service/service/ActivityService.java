package com.activity_service.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.activity_service.model.Activity;
import com.activity_service.repository.ActivityRepository;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    // Constructeur injectant le repository
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAvailableActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(String id) {
        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Invalid ID format: " + id);
        }
        return activityRepository.findById(id);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(String id, Activity updatedActivity) {
        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Invalid ID format: " + id);
        }

        Optional<Activity> existingActivity = activityRepository.findById(id);
        if (existingActivity.isEmpty()) {
            throw new IllegalArgumentException("Activity not found: " + id);
        }

        Activity activity = existingActivity.get();
        if (updatedActivity.getName() != null) {
            activity.setName(updatedActivity.getName());
        }
        if (updatedActivity.getDescription() != null) {
            activity.setDescription(updatedActivity.getDescription());
        }
        if (updatedActivity.getPrice() != null) {
            activity.setPrice(updatedActivity.getPrice());
        }
        return activityRepository.save(activity);
    }

    public void deleteActivity(String id) {
        if (!ObjectId.isValid(id)) {
            throw new IllegalArgumentException("Invalid ID format: " + id);
        }
        if (!activityRepository.existsById(id)) {
            throw new IllegalArgumentException("Activity not found: " + id);
        }
        activityRepository.deleteById(id);
    }
}
