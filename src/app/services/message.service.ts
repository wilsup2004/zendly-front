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
      brokerURL: 'ws://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/ws',
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      console.log(`✅ Connecté au chat ${roomId}`);

      //  Charger l'historique des messages
      this.http.get<Message[]>(`http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/history/${roomId}`).subscribe(data => {
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

  disconnect() {
    if (this.client && this.client.connected) {
      // Déconnexion WebSocket
      this.client.deactivate();
      console.log(`❌ Déconnecté du chat ${this.roomId}`);
      
      // Réinitialiser les valeurs
      this.roomId = null;
      this.messagesSubject.next([]); // Vide les messages
    }
  }

}
