package com.pidev.esprit.controller;
import com.pidev.esprit.model.Capacity;
import com.pidev.esprit.model.Menu;
import com.pidev.esprit.service.CapacityService;
import com.pidev.esprit.service.Reminder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mealreminder")
public class MealReminderController {

    @Autowired
    private Reminder reminder;
    @GetMapping("/next-meal")
    public String getNextMealTime() {
        LocalDateTime now = LocalDateTime.now();
        LocalTime nextMealTime = LocalTime.from(reminder.getNextMealTime(now.toLocalTime()));
        Duration timeUntilNextMeal = Duration.between(now.toLocalTime(), nextMealTime);

        return String.format("%d hours %d minutes %d seconds remaining until %s",
                timeUntilNextMeal.toHoursPart(),
                timeUntilNextMeal.toMinutesPart(),
                timeUntilNextMeal.toSecondsPart(),
                reminder.getTimeDescription(nextMealTime));
    }
}
