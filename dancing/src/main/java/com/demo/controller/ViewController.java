package com.demo.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RestController
@RequestMapping(value = "/view")
@RequiredArgsConstructor
public class ViewController {
    @GetMapping("/index")
    public ModelAndView view() {
        var view = new ModelAndView();
        view.setViewName("index");
        return view;
    }

    @GetMapping("/login")
    public ModelAndView login() {
        var view = new ModelAndView();
        view.setViewName("login");
        return view;
    }

    @GetMapping("/info")
    public ModelAndView info() {
        var view = new ModelAndView();
        view.setViewName("info");
        return view;
    }

}
