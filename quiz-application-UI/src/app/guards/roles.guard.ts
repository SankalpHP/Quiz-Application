import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  //console.log(route);

  // Inject dependencies
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID)
  const helper = inject(HelperService);

  
  // check if angular universe running on the server
  if(platformId == 'server'){
    router.navigate(['/registration']);
    return false;
  }else{
    // Extract required roles from route's data
    const requiredRoles = route.data?.['roles'] as Array<string>;

    // Retrieve token from localStorage (or use a token service)
    const token = localStorage.getItem('token');

    // if token is not present
    if(!token){
      // Redirect to login if no token is found
      router.navigate(['/registration']);
      return false;
    }

    // check the token expiry's or not
    if(helper.isTokenExpired(token)){
      // Decoded JWT payload (assuming it's base64 encoded)
        const payload = JSON.parse(atob(token.split('.')[1]));

        const userRole = payload.role; // Assuming the JWT contains a 'role' field

        // check if the user's role matches any of the required roles
        if(requiredRoles.includes(userRole[0])){
          return true; // allow access
        }else if(requiredRoles.includes(userRole[1])){
          return true; // allow access
        }else{
          // Redirect to home page if the role doesn't match  
          router.navigate(['/registration']);
          return false;
        }

    }else{
      // remove the token from the browser localstorage
        localStorage.removeItem('token');
      
      // navigate to registration page  
        router.navigate(['/registration']);
        return false
    }
  }
};
 