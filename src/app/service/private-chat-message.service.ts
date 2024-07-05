import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';


export interface Message {

  id?: string;
  content: string;
  sender: string;
  recipient: string; 
  timestamp: number;
  isSent?: boolean;
}
@Injectable({
  providedIn: 'root'
})


export class PrivateChatMessageService {

  private messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = afs.collection<Message>('messages', (ref) =>
      ref.orderBy('timestamp', 'asc')
    );
    this.messages = this.messagesCollection.valueChanges({ idField: 'id' });
  }

  sendMessage(msg: Message) {
    this.messagesCollection.add(msg).then(docRef => {
      docRef.update({ id: docRef.id });
    });
  }

  getMessages(): Observable<Message[]> {
    return this.messages;
  }

  getMessagesForConversation(sender: string, recipient: string): Observable<Message[]> {
    return this.afs.collection<Message>('messages', ref => 
      ref.where('sender', 'in', [sender, recipient])
         .where('recipient', 'in', [sender, recipient])
         .orderBy('timestamp', 'asc')
    ).valueChanges({ idField: 'id' });
  }
  
  deleteMessage(msg: Message) {
    if (msg.id) {
      this.messagesCollection.doc(msg.id).delete()
        .then(() => {
          console.log('Messaggio eliminato con successo');
        })
        .catch(error => {
          console.error('Errore durante l\'eliminazione del messaggio:', error);
        });
    } else {
      console.error('Impossibile eliminare il messaggio senza ID.');
    }
  }
}


