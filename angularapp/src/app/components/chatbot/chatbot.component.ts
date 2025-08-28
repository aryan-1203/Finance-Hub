// import { Component } from '@angular/core';
// import { ChatbotService } from 'src/app/services/chatbot.service';

// @Component({
//   selector: 'app-chatbot',
//   templateUrl: './chatbot.component.html',
//   styleUrls: ['./chatbot.component.css']
// })
// export class ChatbotComponent {
//   isOpen = false;
//   userInput = '';
//   messages: { sender: string, text: string }[] = [];
//   loading = false;

//   constructor(private chatbotService: ChatbotService) {}

//   toggleChat() {
//     this.isOpen = !this.isOpen;
//   }

//   sendMessage() {
//     if (!this.userInput.trim()) return;

//     this.messages.push({ sender: 'user', text: this.userInput });
//     this.loading = true;

//     this.chatbotService.addMessage(this.userInput).subscribe({
//       next: (response) => {
//         this.messages.push({ sender: 'bot', text: response.reply });
//         this.loading = false;
//       },
//       error: (err) => {
//         this.messages.push({ sender: 'bot', text: 'Error: Unable to get response.' });
//         this.loading = false;
//         console.error(err);
//       }
//     });

//     this.userInput = '';
//   }
// }
import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: { sender: string, text: string }[] = [];
  loading = false;
  hasWelcomed = false;

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen && !this.hasWelcomed) {
      this.messages.push({ sender: 'bot', text: 'Hi there! How can I help you today?' });
      this.hasWelcomed = true;
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ sender: 'user', text: this.userInput });
    this.loading = true;

    this.chatbotService.addMessage(this.userInput).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'bot', text: response.reply });
        this.loading = false;
      },
      error: (err) => {
        this.messages.push({ sender: 'bot', text: 'Error: Unable to get response.' });
        this.loading = false;
        console.error(err);
      }
    });

    this.userInput = '';
  }
}


