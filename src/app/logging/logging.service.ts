export class LoggingService {
    logStatusChange(newStatus: string): void {
        console.log('A server status changed, new status: ' + newStatus);
    }
}