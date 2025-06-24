package com.kammaniruchulu.krbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kammaniruchulu.krbackend.model.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, String>{

}
