import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  display:string = '';
  result:string = '';
  calculating:boolean = false;
  savedNumber:number = 0;
  separators = ['\\\+', '-', '\\*', '/'];
  currentValue = 0;
  calculated:boolean = false;

  constructor() {

    // this.splitDisplay();
  }


  click(val: string) {
    
    
    switch(val){

      case "=":
        this.display = this.result;
        this.result = "";
        break;

      case "c":
        this.display = "";
        this.result = "";
        break;

      case "d":
        this.display = this.display.substring(0, this.display.length-1);
        this.result = '';
        break;

      default: 
        this.display += val;
        this.splitDisplay();
        break;
    }
    
  }

  splitDisplay() {
    let data: Array<string> = [''];
    let counter: number = 0;
    let result: number = 0;
    let newOperator = '';
    if (this.display.length) {
      for (let i = 0; i < this.display.length; i++) {
        switch (true) {
          case this.display[i] == "+":
            this.makeCalculation(newOperator, parseFloat(data[counter]));
            newOperator = '+';
            counter++;
            data[counter] = "";

            break;

          case this.display[i] == "-":
            this.makeCalculation(newOperator, parseFloat(data[counter]));
            newOperator = '-';
            counter++;
            data[counter] = "";

            break;

          case this.display[i] == "*":
            this.makeCalculation(newOperator, parseFloat(data[counter]));
            newOperator = '*';
            counter++;
            data[counter] = "";
            break;

          case this.display[i] == "/":
            this.makeCalculation(newOperator, parseFloat(data[counter]));
            newOperator = '/';
            counter++;
            data[counter] = "";
            break;

          default:
            data[counter] += this.display[i];
            break;
        }
      }
      if(this.display[this.display.length-1] !== '+' && this.display[this.display.length-1] !== '-' &&
      this.display[this.display.length-1] !== '/' && this.display[this.display.length-1] !== '*'){
          this.makeCalculation(newOperator, parseFloat(data[counter]));
      }
      

      console.log("DATA ", data);
      console.log("RESULT ", result);

    }

  }

  makeCalculation(operator:string, value:number){
    console.log("Operator ", operator);
    
    if(operator!==""){
      console.log("NEW VALUE ", value);
      switch(operator){
        case '+':
          this.currentValue += value;
          break;

          case '-':
          this.currentValue -= value;
          break;

          case '*':
          this.currentValue *= value;
          break;

          case '/':
          this.currentValue /= value;
          break;
      }
      
    }
    else{
      this.currentValue = value;
      console.log("Current value ", this.currentValue);
      
    }
    console.log("Current value ", this.currentValue);
    this.result = this.currentValue.toString();
  }

  verifyOperation(result:string, newVal:string){
    
    const numbers = result.split(new RegExp(this.separators.join('|'), 'g'));
    let operator = "";
    console.log("NUMBERS ", numbers);
    console.log("NEW VAL ", newVal);
    
    
    let operationResult:number = 0;
    switch(true){
      case result.includes('+'):
        operator = "+";
        operationResult = parseFloat(numbers[0]) + parseFloat(newVal);
        break;
      case result.includes('-'):
        operator = "-";
        operationResult = parseFloat(numbers[0]) - parseFloat(newVal);
        break;
      case result.includes('*'):
        operator = "*";
        operationResult = parseFloat(numbers[0]) * parseFloat(newVal);
        break;
      case result.includes('/'):
        operator = "/";
        operationResult = parseFloat(numbers[0]) / parseFloat(newVal);
        break;
    }
    this.result += " " + newVal   + " = ";
    this.display = operationResult.toString();
    console.log("RESS ", operationResult);
  }
  

  
}
