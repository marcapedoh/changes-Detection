import { ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
})
export class MessagesListComponent implements OnInit {
  // messages = input.required<string[]>();

  private messageService = inject(MessageService);

  private destroyRef = inject(DestroyRef)
  private cdRef = inject(ChangeDetectorRef)
  messages: string[] = []
  ngOnInit(): void {
    const subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages
      this.cdRef.markForCheck()
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
