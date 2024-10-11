import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  log_data: any = {};
  registrationLogs: any[] = [];
  updateLogs: any[] = [];
  deleteLogs: any[] = [];

  constructor(private http: LogsService) {}

  getLogs() {
    this.http.get_logs({}).subscribe({
      next: (response: any) => {
        if (response && response.result) {
          // Trier les logs en fonction de l'action
          this.registrationLogs = response.result.filter((log: any) => log.action === 'create');
          this.updateLogs = response.result.filter((log: any) => log.action === 'update');
          this.deleteLogs = response.result.filter((log: any) => log.action === 'delete');
        } else {
          console.error('Error: Invalid response format or empty log list');
        }
      },
      error: (err) => {
        console.error('Error during fetching logs:', err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  ngOnInit(): void {
    this.getLogs();
  }
}
