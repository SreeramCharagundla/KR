package com.kammaniruchulu.krbackend.service;

import com.kammaniruchulu.krbackend.model.UserProfile;
import com.kammaniruchulu.krbackend.repository.UserProfileRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {
	
	@Autowired
	private UserProfileRepository repository;
	
	public List<UserProfile> getAllProfiles(){
		return repository.findAll();
	}
	
	public UserProfile getProfileByPhone(String phoneNumber) {
	    return repository.findById(phoneNumber).orElse(null);
	}
	
	public UserProfile saveProfile(UserProfile profile) {
		return repository.save(profile);
	}
	
	public void deleteProfile(String phoneNumber) {
		repository.deleteById(phoneNumber);
	}
}
