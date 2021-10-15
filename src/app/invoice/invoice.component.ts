import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [DataService]
})
export class InvoiceComponent implements OnInit {
  invoiceNum: number;
  clientName: string;
  clientLName: string;
  phoneNum: string;
  movie: string;
  screening: string;
  theater: string;
  price: number;
  quantity: number;
  total: number;
  subtotal: number;


  constructor(private dataSvc: DataService) {
     this.invoiceNum = 0;
     this.clientName = "Luis Pedro";
     this.clientLName = "Morales"
     this.phoneNum = "61538981";
     this.movie = "Venom";
     this.screening = "16:00"
     this.theater = "Paseo";
     this.price = 3500 / 1.13;
     this.quantity = 2;
     this.total = this.quantity * +this.price;
     this.subtotal = this.total * 1.13;
   }

  ngOnInit(): void {
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
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: ["Purchase", "Movie", "Screening", "Theater", "Price", "Quantity", "Total"],
        table: Array.from(Array(1), (item, index) => ([
          index + 1,
          this.movie,
          this.screening,
          this.theater,
          Math.floor(this.price),
          this.quantity, 
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

}
