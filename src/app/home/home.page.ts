import { Component } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from "@capacitor-community/admob";
import { environment } from 'src/environments/environment';

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
  separators = ['\\\+', '-', '\\*', '/', '%'];
  currentValue = 0;
  calculated:boolean = false;
  ringtones =  ['puercoarana', 'spider1', 'spider2'];
  ringtoneEnabled = true;
  testing:boolean = environment.production && environment.production == 'false' ? true : false;
  // testing:boolean = true;
  
  constructor() {
    console.log("Env ", environment)
    console.log("Testing", this.testing);
    this.initialize();
    
  }

  async initialize(){
    const { status } = await AdMob.trackingAuthorizationStatus();
    // alert('Status ' + status)
    
    if(status === 'notDetermined'){
      console.log("Display info");
    } 

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: this.testing ? ['One Plus'] : [],
      initializeForTesting: this.testing
    });

    await this.showBanner();
  }

  async showBanner() {
    // const adId = isPlatform('ios') ? 'ios-ad-id' : 'android-ad-unit';
    const adId = 'ca-app-pub-9368904111185613/7487591591'; 
    const option: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: this.testing
    };

    await AdMob.showBanner(option);
  }

  playRingtone(){
    let audioElement:any = document.getElementById("myAudio");
    const position = Math.floor(Math.random() * 3);
    const ringtone =  "../assets/mp3/"+ this.ringtones[position] + ".mp3";
    audioElement.src = ringtone;
    audioElement.play;    
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
          
            case this.display[i] == "%":
              this.makeCalculation(newOperator, parseFloat(data[counter]));
              newOperator = '%';
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
      

    }

  }

  makeCalculation(operator:string, value:number){
  

    if(operator!==""){
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

          case '%':
            this.currentValue += value * parseFloat("0."+value);
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
   
    this.result =  this.currentValue.toString();
    if(this.result.includes(".")){
      this.result = (Math.round(this.currentValue * 100) / 100).toFixed(2).toString();
    }
    
    if(this.result==="NaN"){
      this.result = "";
    }
  }

  
  

  
}
