package com.pidev.esprit.controller;
import com.pidev.esprit.model.Capacity;
import com.pidev.esprit.model.Menu;
import com.pidev.esprit.service.CapacityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/capacity")
public class CapacityController {

    @Autowired
    private CapacityService capacityService;

    @GetMapping("/{id}")
    public ResponseEntity<Capacity> getCapacityById(@PathVariable Long id) {
        Capacity capacity = capacityService.getCapacityById(id);
        if (capacity != null) {
            return new ResponseEntity<>(capacity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/value")
    public ResponseEntity<Capacity> updateCapacityValue(@PathVariable("id") Long id, @RequestParam("value") Integer newValue) {
        Capacity capacity = capacityService.updateCapacityValue(id, newValue);
        return ResponseEntity.ok(capacity);
    }



    @PostMapping("/")
    public Capacity createCapacity(@RequestBody Capacity capacity) {
        capacity.setId(1L); // Set the id to 1
        capacityService.addCapacity(capacity);
        return capacity;
    }

    @GetMapping("/")
    public ResponseEntity<List<Capacity>> getAllCapacities() {
        List<Capacity> capacities = capacityService.getAllCapacities();
        if (!capacities.isEmpty()) {
            return new ResponseEntity<>(capacities, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCapacityById(@PathVariable Long id) {
        capacityService.deleteCapacityById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}







