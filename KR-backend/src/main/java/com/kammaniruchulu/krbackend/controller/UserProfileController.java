package com.kammaniruchulu.krbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kammaniruchulu.krbackend.model.UserProfile;
import com.kammaniruchulu.krbackend.service.UserProfileService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserProfileController {
	
	@Autowired
	private UserProfileService service;
	
	@GetMapping
	public List<UserProfile> getAllUsers(){
		return service.getAllProfiles();
	}
	
	@PostMapping
	public UserProfile createUser(@RequestBody UserProfile profile) {		
		return service.saveProfile(profile);
	}
	
	@GetMapping("/login/{phoneNumber}")    // GET /api/users/login/1234567890
    public ResponseEntity<LoginResponse> login(@PathVariable String phoneNumber) {
        UserProfile user = service.getProfileByPhone(phoneNumber); // implement in service/DAO
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                  .body(new LoginResponse(false, null));
        }
        return ResponseEntity.ok(new LoginResponse(true, user.getName()));
    }
	
	@DeleteMapping("/{phoneNumber}")
	public ResponseEntity<Void> deleteUser(@PathVariable String phoneNumber){
		service.deleteProfile(phoneNumber);
		return ResponseEntity.noContent().build();
	}
	
	public record LoginResponse(boolean success, String name) {}
}
