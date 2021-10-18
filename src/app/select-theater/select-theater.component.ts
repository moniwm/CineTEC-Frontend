import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { ScreeningManagementComponent } from '../screening-management/screening-management.component';

@Component({
  selector: 'app-select-theater',
  templateUrl: './select-theater.component.html',
  styleUrls: ['./select-theater.component.css'],
  providers: [DataService]
})
export class SelectTheaterComponent implements OnInit {

  theaters = null;
  theatersAmount = 0;

  movies = null;
  moviesAmount = 0;

  screenings = null;
  screeningsAmount = 0;

  seats:any;

  theaterSelected = false;
  movieSelected = false;
  screeningSelected = false;
  sumary = false;

  ticketsAmount = 1;
  cinemaNumber = 0;
  cinemaRows = 0;
  cinemaColumns = 0;
  screeningTime = 0;
  seatIndex = -1;
  columns = [];
  rows = [];

  theater = '';
  movie = '';

  invoiceNum: number;
  clientName = '';
  clientLName = ' ';
  phoneNum = ' ';
  price: number;
  total: number;
  subtotal: number;
  clientId: string;
  date: string;
  screeningId = ' ';

  boughtSeats:Array<Array<number>>;

  constructor(
    private dataSvc: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clientId = this.route.snapshot.params['id'];

    this.invoiceNum = 0;
    this.setClient(this.clientId);
    this.date = this.dateWithoutTime();
    this.price = 3500 / 1.13;
    //this.total = this.quantity * +this.price;
    //this.subtotal = this.total * 1.13;
    this.total = 0;
    this.subtotal = 0;

    this.boughtSeats = new(Array);
  }

  ngOnInit(): void {
    this.dataSvc.getTheaters().subscribe((theaters) => this.theaters = theaters);
  }

  onSelectTheater(theater: any) {
    this.seatIndex = 0;
    this.theater = theater;
    this.theaterSelected = true;
    this.dataSvc.getMovieByTheater(this.theater).subscribe((res) => {
      this.movies = res;
      this.moviesAmount = res.length
    });
    this.movieSelected = false;
    this.screeningSelected = false;
    this.sumary = false;

  }

  onSelectMovie(movie: any) {
    this.seatIndex = 0;
    this.movieSelected = true;
    this.sumary = false;
    this.movie = movie;
    this.dataSvc.getScreeningByTheaterMovie(this.theater, this.movie).subscribe((res) => {
      this.screenings = res;
      this.screeningsAmount = res.length
    });
    this.screeningSelected = false;
  }

  onSelectScreening(screeningCinemaNumber: any, screeningTime: any, screeningId: any) {
    this.screeningId = screeningId;
    this.cinemaNumber = screeningCinemaNumber;
    this.screeningTime = screeningTime;
    this.seatIndex = 0;
    this.screeningSelected = true;
    this.sumary = false;
    this.dataSvc.getCinemaByNumber(screeningCinemaNumber).subscribe((res) => {
      this.cinemaRows = res.rows;
      this.cinemaColumns = res.columns;
    });
    this.dataSvc.getSeatByScreeningNumber(screeningId).subscribe((res) => this.seats = res);


  }

  getSpecificSeat(row: any, column: any){

    
    return this.dataSvc.getSpecificSeat(this.screeningId, row, column);

  }

  changeTicketsAmount(amount: any) {
    this.ticketsAmount = amount;
  }

  onBuyTicket() {
    this.sumary = true;
  }

  setClient(clientId: string) {
    this.dataSvc.getClientById(this.clientId).subscribe((res) => {
      this.clientName = res.firstName;
      this.clientLName = res.lastName;
      this.phoneNum = res.phoneNumber;
    });
  }

  onConfirm() {
    this.dataSvc.postInvoice(
      {
        "clientId": Number(this.clientId),
        "theatername": this.theater,
        "movieoriginalname": this.movie,
        "screeningid": this.screeningId,
        "date" : this.date,
        "seats":[]
      }
    ).subscribe((res) => this.invoiceNum = res)
    this.total = this.ticketsAmount * +this.price;
    this.subtotal = this.total * 1.13;

    this.createInvoice();
  }
  
  dateWithoutTime(){
    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
    return String(date); 
  }

  public createInvoice(): void {
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "CineTEC_purchase" + this.invoiceNum.toString(),
      orientationLandscape: false,
      logo: {
        src: "../assets/logo.jpeg",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
        }
      },
      business: {
        name: "CineTEC",
        address: "Barrio Escalante, Avenida 7, San José, Costa Rica",
        phone: "(+506) 2555 5555",
        email: "costumer_service@cinetec.com",
        website: "www.cinetec.cr",
      },
      contact: {
        label: "Invoice issued for:",
        name: this.clientName + ' ' + this.clientLName,
        phone: '(+506) ' + this.phoneNum,
        email: this.clientName.charAt(0).toLowerCase() + this.clientLName.toLowerCase() + "@gmail.com",
      },
      invoice: {
        label: "Invoice number: ",
        num: this.invoiceNum,
        invDate: "Payment Date: " + this.date,
        invGenDate: "Invoice Date: " + this.date,
        headerBorder: false,
        tableBodyBorder: false,
        header: ["Purchase", "Movie", "Screening", "Theater", "Price", "Quantity", "Total"],
        table: Array.from(Array(1), (item, index) => ([
          index + 1,
          this.movie,
          this.screeningTime + ":00",
          this.theater,
          Math.floor(this.price),
          this.moviesAmount, 
          Math.floor(this.total)
        ])),
        invTotalLabel: "Total:",
        invTotal: Math.floor(this.total).toString() + " \u00A2",
        row1: {
          col1: 'IVA:',
          col2: '13%',
          style: {
            fontSize: 10 //optional, default 12
          }
        },
        row2: {
          col1: 'SubTotal:',
          col2: this.subtotal.toString() + " \u00A2",
          style: {
            fontSize: 10 //optional, default 12
          }
        }
        //invDescLabel: "Invoice Note",
        //invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    var invoice = jsPDFInvoiceTemplate(props);
  }

  onSeat(i : number, j : number){
    let newSeat = [i,j];
    for (var seat of this.boughtSeats){
      if (seat[0] == i && seat[1] == j){
        return;
      }
    }
    this.boughtSeats.push(newSeat);
    console.log(this.boughtSeats);
  }
}
