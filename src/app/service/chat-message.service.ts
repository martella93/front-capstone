import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Message {
  id ?: string;
  content: string;
  sender: string;
  timestamp: number;
  isSent?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
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
