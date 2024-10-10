import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Assurez-vous que NgBootstrap est correctement installé

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, AfterViewInit {

  constructor(@Inject(NgbModal) private modalService: NgbModal) { // Ajoutez @Inject(NgbModal) avant le paramètre modalService

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: []
  };

  openEventModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addEvent(dateClicked: any) {
    const newEvent = {
      title: 'New Event',
      start: dateClicked.dateStr, // Date format: 'YYYY-MM-DD'
      backgroundColor: 'rgba(91,71,251,.2)',
      borderColor: '#5b47fb',
    };


    if (Array.isArray(this.calendarOptions.events)) {
      this.calendarOptions.events.push(newEvent);
    }
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

}
