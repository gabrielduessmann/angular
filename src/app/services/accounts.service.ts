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

      addAccount(name: string, status: string): void {
        this.accounts.push({name: name, status: status});
      }

      updateStatus(id: number, status: string): void {
        if (this.accounts[id])
            this.accounts[id].status = status;
      }
}