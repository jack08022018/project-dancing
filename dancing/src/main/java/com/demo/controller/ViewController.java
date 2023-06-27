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
    @GetMapping("/login")
    public ModelAndView login() {
        ModelAndView view = new ModelAndView();
        view.setViewName("login");
        return view;
    }

    @GetMapping("/studentInfo")
    public ModelAndView studentInfo() {
        ModelAndView view = new ModelAndView();
        view.setViewName("studentInfo");
        return view;
    }

    @GetMapping("/adminPage")
    public ModelAndView adminClass() {
        ModelAndView view = new ModelAndView();
        view.setViewName("adminPage");
        return view;
    }

    @GetMapping("/adminStudent")
    public ModelAndView adminStudent() {
        ModelAndView view = new ModelAndView();
        view.setViewName("adminStudent");
        return view;
    }

}
