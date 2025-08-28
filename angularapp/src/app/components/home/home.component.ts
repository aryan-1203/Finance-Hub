// import { Component, OnInit, Optional } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
  
//   constructor(@Optional() private authService: AuthService) 
//   {
//     if (!this.authService)
//     {
//       console.warn('AuthService is not provided!');
//     }
//   }

//   images = [
//     'assets/image1.jpeg',
//     'assets/image2.jpeg',
//     'assets/image3.jpeg',
//     'assets/home_icon.png'
//   ];
//   currentIndex = 0;
//   previousIndex=0;
//   intervalId: any;
//   userRole: string | null = '';
 
//   ngOnInit() {
//     this.userRole = localStorage.getItem('userRole');
//     this.startAutoSlide();
//   }
 
//   ngOnDestroy() {
//     clearInterval(this.intervalId);
//   }
 
 
 
//   getStarted() {
//     alert("Welcome to FinanceHub! Let's get started.");
//   }
 
//   animationClass = 'animate__animated animate__fadeIn';
//   next() {
//     this.animationClass = '';
//     setTimeout(() => {
//       this.previousIndex = this.currentIndex;
//       this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
//       this.animationClass = 'animate__animated animate__fadeIn';
//     }, 10);
//   }
  
  

// startAutoSlide() {
//   this.intervalId = setInterval(() => {
//     this.next();
//   }, 3700);
// }




//   isRegionalManager()
//   {
//     return localStorage.getItem('userRole')==='RegionalManager';
//   }

//   isCustomer()
//   {
//     return localStorage.getItem('userRole')==='Customer';
//   }
  
//   isLoggedIn()
//   {
//     return this.authService.isLoggedIn();
//   }
 

// }
import { Component, OnInit, Optional } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(@Optional() private authService: AuthService) 
  {
    if (!this.authService)
    {
      console.warn('AuthService is not provided!');
    }
  }

 
stats = [
  { label: 'Customer Satisfaction', value: 98, current: 0, suffix: '%', format: 'percent' },
  { label: 'Active Users', value: 40000, current: 0, suffix: '+', format: 'short' },
  { label: 'Customer Savings', value: 3200000, current: 0, prefix: '$', suffix: '+', format: 'short' }
];



  images = [
    'assets/image1.jpeg',
    'assets/image2.jpeg',
    'assets/image3.jpeg',
    'assets/home_icon.png'
  ];
  currentIndex = 0;
  previousIndex=0;
  intervalId: any;
  userRole: string | null = '';
 
  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.startAutoSlide();
    this.animateStats();
    return this.authService.isLoggedIn();
  }
 
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
 
 
 
  getStarted() {
    alert("Welcome to FinanceHub! Let's get started.");
  }
 
  animationClass = 'animate__animated animate__fadeIn';
  next() {
    this.animationClass = '';
    setTimeout(() => {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
      this.animationClass = 'animate__animated animate__fadeIn';
    }, 10);
  }
  
  

startAutoSlide() {
  this.intervalId = setInterval(() => {
    this.next();
  }, 3700);
}




animateStats() {
  this.stats.forEach(stat => {
    const increment = stat.value / 100;
    const interval = setInterval(() => {
      stat.current += increment;
      if (stat.current >= stat.value) {
        stat.current = stat.value;
        clearInterval(interval);
      }
    }, 20);
  });
}



formatNumber(value: number, format: string): string {
  if (format === 'short') {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
  }
  return Math.round(value).toString();
}


  isRegionalManager()
  {
    return localStorage.getItem('userRole')==='RegionalManager';
  }

  isCustomer()
  {
    return localStorage.getItem('userRole')==='Customer';
  }
  
  isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }
 

}
