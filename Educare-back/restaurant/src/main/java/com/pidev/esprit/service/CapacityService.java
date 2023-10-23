package com.pidev.esprit.service;

import com.pidev.esprit.model.Capacity;
import com.pidev.esprit.model.Menu;
import com.pidev.esprit.model.Order;
import com.pidev.esprit.repository.CapacityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
 @Slf4j
@EnableScheduling
public class CapacityService {
    @Autowired
    private CapacityRepository capacityRepository;


    public List<Capacity> getAllCapacities() {
        return (List<Capacity>) capacityRepository.findAll();
    }

    public Capacity getCapacityById(Long id) {
        return capacityRepository.findById(id).orElse(null);
    }

    public Capacity addCapacity(Capacity capacity) {
        if (capacityRepository.count() > 0) {
            throw new RuntimeException("Capacity already exists");
        }
        capacityRepository.save(capacity);
        return capacity;
    }

    public Capacity updateCapacityValue(Long id, Integer newValue) {
        Capacity capacity = capacityRepository.findById(id).orElse(null);
        if (capacity == null) {
            throw new RuntimeException("Capacity not found");
        }
        capacity.setValue(newValue);
        capacityRepository.save(capacity);
        return capacity;
    }


    public void deleteCapacityById(Long id) {
        capacityRepository.deleteById(id);
    }


    @Scheduled(cron = "0 0 0 * * ?")
    public void SetCpacite(){
        List<Capacity>capacities = (List<Capacity>) capacityRepository.findAll();
        long id = capacities.get(0).getId();
        Capacity capacity = capacityRepository.findById(id).get();
        capacity.setValue(100);
        capacityRepository.save(capacity);
        log.info("the capacity has been reset");


    }



}