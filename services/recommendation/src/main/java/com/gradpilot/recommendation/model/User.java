// com.gradpilot.chatbot.model.User.java
package com.gradpilot.recommendation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @NotBlank(message = "Name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Column(name = "bicrypted_pass", nullable = false)
    private String password;

    @Column(name = "cgpa", precision = 3, scale = 2)
    private BigDecimal cgpa;

    @Column(name = "apply_year")
    private Integer applyYear;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_payment")
    private LocalDateTime lastPayment;

    @ManyToMany
    @JoinTable(name = "user_research_interests", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "research_interest_id"))
    private java.util.List<ResearchInterest> researchInterests;

    @ManyToMany
    @JoinTable(name = "user_target_countries", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "country_id"))
    private java.util.List<Country> targetCountries;

    @ManyToMany
    @JoinTable(name = "user_target_majors", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "major_id"))
    private java.util.List<Major> targetMajors;

    // @ManyToMany
    // @JoinTable(name = "fields_of_study", joinColumns = @JoinColumn(name =
    // "user_id"), inverseJoinColumns = @JoinColumn(name = "id"))
    // private FieldOfStudy fieldOfStudy;

    // Constructors
    public User() {
    }

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }

    public User(String name, String email, String password, BigDecimal cgpa, Integer applyYear) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cgpa = cgpa;
        this.applyYear = applyYear;
        this.createdAt = LocalDateTime.now();
    }

    // UserDetails interface methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getUsername() {
        return email; // Using email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigDecimal getCgpa() {
        return cgpa;
    }

    public void setCgpa(BigDecimal cgpa) {
        this.cgpa = cgpa;
    }

    public Integer getApplyYear() {
        return applyYear;
    }

    public void setApplyYear(Integer applyYear) {
        this.applyYear = applyYear;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public java.util.List<ResearchInterest> getResearchInterests() {
        return researchInterests;
    }

    public java.util.List<Country> getTargetCountries() {
        return targetCountries;
    }

    public java.util.List<Major> getTargetMajors() {
        return targetMajors;
    }

    public LocalDateTime getLastPayment() {
        return lastPayment;
    }

    public void setLastPayment(LocalDateTime lastPayment) {
        this.lastPayment = lastPayment;
    }
}