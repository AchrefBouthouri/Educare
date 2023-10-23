package com.pidev.esprit.controller;

import com.pidev.esprit.service.CalorieService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/calories")
public class CalorieController {
    private final CalorieService calorieService;

    public CalorieController(CalorieService calorieService) {
        this.calorieService = calorieService;
    }

    @GetMapping("/{mealName}")
    public double getCaloriePercentage(@PathVariable String mealName,
                                       @RequestParam @Min(value = 1, message = "Height must be at least 1") @Max(value = 250, message = "Height cannot be greater than 250") double height,
                                       @RequestParam @Min(value = 1, message = "Weight must be at least 1") @Max(value = 250, message = "Weight cannot be greater than 250") double weight,
                                       @RequestParam @Min(value = 1, message = "Age must be at least 1") @Max(value = 120, message = "Age cannot be greater than 120") int age,
                                       @RequestParam boolean isMale) {
        // Validate input parameters
        if (StringUtils.isEmpty(mealName)) {
            throw new IllegalArgumentException("mealName cannot be empty");
        }
        if (height <= 0) {
            throw new IllegalArgumentException("height must be greater than 0");
        }
        if (weight <= 0) {
            throw new IllegalArgumentException("weight must be greater than 0");
        }
        if (age <= 0) {
            throw new IllegalArgumentException("age must be greater than 0");
        }

        double percentage = calorieService.getCaloriePercentage(mealName, height, weight, age, isMale);
        return percentage;
    }

}
