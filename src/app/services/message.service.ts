import { Injectable } from '@angular/core'; 
import { Client } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private client!: Client;
  private roomId!: any;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable(); // Observable des messages

  constructor(private http: HttpClient) {}

  connect(roomId: any) {
    this.roomId = roomId;
    this.client = new Client({
      brokerURL: 'ws://192.168.1.21:8081/ws',
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      console.log(`✅ Connecté au chat ${roomId}`);

      //  Charger l'historique des messages
      this.http.get<Message[]>(`http://192.168.1.21:8081/history/${roomId}`).subscribe(data => {
        this.messagesSubject.next(data); // Met à jour l'Observable
      });

      // Écouter les nouveaux messages
      this.client.subscribe(`/topic/chat/${roomId}`, (message) => {
        console.log(`📩 Message reçu :`, message.body);
        const newMessage = JSON.parse(message.body);
        this.messagesSubject.next([...this.messagesSubject.getValue(), newMessage]); // Ajoute et met à jour
      });
    };

    this.client.activate();
  }

  sendMessage(message: Message) {
    if (this.client && this.client.connected) {
      this.client.publish({ 
        destination: `/app/chat/${this.roomId}`, 
        body: JSON.stringify(message) 
      });
    } else {
      console.error("🚨 WebSocket non connecté !");
    }
  }
}



/*
import { Injectable } from '@angular/core'; 
import { Client } from '@stomp/stompjs';

import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message.model';

const baseUrl = 'http://192.168.1.21:8081/chat/messages'

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private client!: Client;
  private roomId: any;
  messages: Message[] = [];

  constructor(private http: HttpClient) { }

  connect(roomId: any) {
    this.roomId  = roomId;
    this.client = new Client({
      brokerURL: 'ws://192.168.1.21:8081/ws',
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      console.log(`✅ Connecté au chat ${roomId}`);

      // Récupérer l'historique
      this.http.get<Message[]>(`http://192.168.1.21:8081/history/${roomId}`).subscribe(data => {
        this.messages = data;
        console.log(this.messages);
      });

      this.client.subscribe('/topic/chat/${roomId}', (message) => {
        console.log(`📩 Message reçu dans ${roomId} :`, message.body);
        this.messages.push(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  sendMessage(view: Message) {

    this.client.publish({ 
      destination: '/app/chat/${roomId}', 
      body:  JSON.stringify(view) 
    });
  }


}
*/

