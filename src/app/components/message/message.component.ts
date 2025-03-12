import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/model/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation
import { PriseChargeService } from 'src/app/services/prise-charge.service';
import { PriseCharge } from 'src/app/model/prise-charge.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  idPrise: any;
  idUserPrise: any;
  idUserColis: any;
  horodatage: any;

  priseCharge: PriseCharge = {};
  content: any;

  messages: Message[] = [];

  @Input() newMessage: Message = {
    idPrise: '',
    idUserPrise: '',
    idUserColis: '',
    sender: '',
    horodatage: new Date,
    message: ''
  };

  //@Input() messages: Message[] = [];
  groupedMessages: { date: string; messages: Message[] }[] = [];

  constructor(public authService: AuthService,
    private priseChargeService: PriseChargeService,
    public messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location) {

    this.authService.user.subscribe((user) => {
      if (user) {
        this.newMessage.sender = user.idUser;
      }
    });

  }

  ngOnInit(): void {
    
    this.idPrise = this.route.snapshot.params["idPrise"];
    this.idUserColis = this.route.snapshot.params["idUserColis"];
    this.newMessage.idPrise = this.idPrise;
    this.newMessage.idUserColis = this.idUserColis;

    this.priseChargeService.getById(this.idPrise)
    .subscribe(data => {
      this.priseCharge = data;
      console.log(this.priseCharge);
      this.newMessage.idUserPrise = this.priseCharge.users?.idUser
    });

    this.messageService.connect(this.idPrise);
      //Abonnement aux messages en temps réel
      this.messageService.messages$.subscribe(data => {
        this.messages = data;
        this.groupMessagesByDate();
      });
   
  }


  groupMessagesByDate() {
    const grouped = new Map<string, Message[]>();
    this.messages.forEach((msg) => {
      const date = new Date(msg.horodatage).toLocaleDateString(); // Format JJ/MM/AAAA
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)!.push(msg);
    });

    this.groupedMessages = Array.from(grouped, ([date, messages]) => ({ date, messages }));
  }

  sendMessage(): void {
    this.newMessage.horodatage = new Date;
    console.log(this.newMessage);
   
    this.messageService.sendMessage(this.newMessage);
    this.newMessage.message = '';
   // window.location.reload;
  }

  ngOnDestroy() {
    console.log('🚪 L’utilisateur quitte le chat...');
    this.messageService.disconnect(); // Appel de la fonction à la sortie du composant
  }

  goBack() {
   // this.messageService.disconnect();
    this.location.back();
  }

}
