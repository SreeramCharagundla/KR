package com.kammaniruchulu.krbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Column(nullable = false, length = 25)
    private String name;

    @Column(nullable = false, length = 5)
    private String countryCode;

    @Id
    @Column(nullable = false, length = 15)
    private String phoneNumber;

    public UserProfile() {
    }

    public UserProfile(String name, String countryCode, String phoneNumber) {
        this.name = name;
        this.countryCode = countryCode;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "UserProfile{" +
                "name='" + name + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}

