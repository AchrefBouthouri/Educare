package com.pidev.esprit.controller;

import com.pidev.esprit.model.Menu;
import com.pidev.esprit.model.Rien;
import com.pidev.esprit.repository.MenuDeSemaineRepository;
import com.pidev.esprit.repository.RienRepository;
import com.pidev.esprit.service.JavaEmailService;
import com.pidev.esprit.service.MenuDeSemaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semaine")

public class MenuDeSemaineController {

    @Autowired
    MenuDeSemaineService menuDeSemaineService;
    @Autowired
    JavaEmailService javaEmailService;
    @Autowired
    MenuDeSemaineRepository menuDeSemaineRepository;
    @Autowired
    RienRepository rienRepository;

@GetMapping("/ppp")
    public String GetMenus(){
       return menuDeSemaineService.MenuD();
   }
   @PostMapping("/email")
    public void sendMail(@RequestParam("email") String email){
       List<Rien>riens = rienRepository.findAll();
       long id = riens.get(0).getId();
       Rien rien = rienRepository.findById(id).get();
       String s = rien.getS();
       javaEmailService.sendEmail(email, "Le menu de cette  semaine ",s);




   }
@GetMapping("/allMenus")
    public List<Menu>  GetalllMenus(){
    return menuDeSemaineService.GetMenus();
    }











}
