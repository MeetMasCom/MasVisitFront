import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  //templateUrl: './countdown.component.html',
  template: `
  <div class="d-flex justify-content-center">
    <h5>Falta:{{ countdown }}</h5>
  </div>
`,
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {

  @Input() name: string='';
  @Input() fecha: Date | undefined;

  targetDate: any;
  countdown: string='';

  ngOnInit() {
    setInterval(() => {
      this.cuentaRegresiva();
    }, 1000);
  }

 
  cuentaRegresiva():string{
    if(this.fecha!==undefined)
    {
      this.targetDate = new Date(this.fecha);
      // Actualizar la cuenta regresiva cada segundo
      setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = this.targetDate.getTime() - now;
        
        if (timeRemaining > 0) {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
          this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          this.countdown = '¡Tiempo finalizado!';
        }
      }, 1000);
      return this.countdown;
    }
    else{
      console.log("error en la fecha");
    }
    return this.countdown
   
  }
}