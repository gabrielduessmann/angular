import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

// Injecatable is necessary here because of metadata and I don't have any other decorator
@Injectable()
export class AccountsService {
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      constructor(private loggingService: LoggingService) {}

      addAccount(name: string, status: string): void {
        this.accounts.push({name: name, status: status});
        this.loggingService.logStatusChange(status);
      }

      updateStatus(id: number, status: string): void {
        if (this.accounts[id]) {
            this.accounts[id].status = status;
            this.loggingService.logStatusChange(status);
        }
      }
}