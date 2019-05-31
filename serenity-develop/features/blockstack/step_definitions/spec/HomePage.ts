import { browser, element, by, By, $, $$, ExpectedConditions, promise, protractor, Key } from 'protractor';
import { BasePage } from '../spec/BasePage';

const url = process.env.TEST_URL || 'https://staging-explorer.blockstack.xyz';

export class HomePage extends BasePage {
  private callUs = element(by.className("ewXKKG"));
  // constructor(){}
  private idd = element.all(by.className('bqFlkF'));
  private idEnable=element(by.className("dxSyyy"));
  private barcode=element(by.className('cowjLw'));
  private downIcon=element(by.className('hiwGvD'));
  private dateBack=element(by.className('dNUTga'));
  openHomePage() {
    browser.waitForAngularEnabled(false);
    browser.get(`${url}`);
  }
  
  enterNameInSearchBar(name: string) {
    element(by.xpath('//*[@id="__next"]/div[1]/div[1]/form/div[3]/input')).sendKeys(name);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    browser.sleep(4999);
    console.log('sleep for 5 sec');
  }
  
  async enterAddressAndPressEnterKey(address: string) {
    element(by.xpath('//*[@id="__next"]/div[1]/div[1]/form/div[3]/input')).sendKeys(address);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    browser.sleep(4999);
    console.log('sleep for 5 sec');
  }
  
  async checkInformation(){
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.wait(ExpectedConditions.elementToBeClickable(this.callUs),40000);
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.waitForAngular();
    const l= await browser.executeScript("return document.getElementsByClassName('sc-bdVaJa bqFlkF')[0].innerText");
    console.log("String is "+l);
    return l;
  }
  
  async clickOnNameLink(){
    await this.clickClassButton('sc-bxivhb cRteMP sc-bdVaJa cIgLIY','Names');
  }
  
  async getListheading(){
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.wait(ExpectedConditions.elementToBeClickable(this.idEnable),40000);
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.waitForAngular();
    const ll= await browser.executeScript("return document.getElementsByClassName('sc-bdVaJa dxSyyy')[0].innerText");
    console.log("String is "+ll);
  }
  
  async clickOnGivenId(id:string){
    await browser.executeScript("window.scrollBy(0,10000)");
    await this.clickClassButton('ewXKKG','View More');
    await browser.waitForAngular();
    await browser.sleep(2999).then(function () {
      console.log('sleep 4 second');
    }); 
    await this.clickClassButton('KEUBz',id);
  }
  
  
  async checkAddressInformation(){
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.wait(ExpectedConditions.elementToBeClickable(this.barcode),40000);
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.waitForAngular();
    const l= await browser.executeScript("return document.getElementsByClassName('sc-bdVaJa fWwYCo')[0].innerText");
    console.log("name or address is "+l);
    return l;
  }
  
  async openURL(){
    browser.waitForAngularEnabled(false);
    browser.get(`${url}/name/legnasiul.id.blockstack`);
  }
  
  async clickOnAddressLink(address: string){
    await browser.sleep(1999).then(function () {
      console.log('sleep 2 second');
    });
    await this.clickClassButton('fWwYCo','569896');
    await browser.sleep(1999).then(function () {
      console.log('after clicking sleep 2 second');
    });
  }
  
  async enterBlockNumber(blockNumber: string){
    await element(by.xpath('//*[@id="__next"]/div[1]/div[1]/form/div[3]/input')).sendKeys(blockNumber);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.waitForAngular();
    await browser.sleep(4999);
    console.log("sleep for 5 sec");
  }
  
  async getBlockInformation(){
    
  }
  
  async openURLForBlock(){
    browser.waitForAngularEnabled(false);
    browser.get(`${url}/tx/335b303a711c71130d10b440b0ac42100830e20407e875422f5832437650bb5c`);
  }
  async openURLForBlock2(){
    browser.waitForAngularEnabled(false);
    browser.get(`${url}/blocks`);
  }
  async clickOnViewMoreBtn(){
    await browser.executeScript("window.scrollBy(0,10000)");
    await browser.sleep(1999).then(function () {
      console.log('sleep 2 second');
    });
    await this.clickClassButton('sc-bdVaJa bZXzYB','View More Blocks');
  }
  
  async clickOnDateBtn(){
    await browser.executeScript("document.getElementsByClassName('sc-bdVaJa dTlDiF')[0].click()");
  }
  
  async getSearchResultOfBlock(){
    await browser.sleep(9999).then(function () {
      console.log('sleep 4 second');
    });
    // await browser.wait(ExpectedConditions.elementToBeClickable(this.downIcon),40000);
    // await browser.wait(ExpectedConditions.visibilityOf(this.traInf),40000);
    await browser.sleep(9999).then(function () {
      console.log('sleep 9 second');
    });
    await browser.waitForAngular();
    const inf= await browser.executeScript("return document.getElementsByClassName('sc-bdVaJa flNnOd')[0].innerText");
    console.log("name or address is "+inf);
    return inf;
  }
  
  async clicksOnDateButtonBack(){
    await browser.sleep(1999).then(function () {
      console.log('sleep 2 second');
    });
    for(let i=0;i<7;i++){
      await browser.wait(ExpectedConditions.elementToBeClickable(this.dateBack));
      await browser.executeScript("document.getElementsByClassName('sc-bdVaJa dTlDiF')[0].click()");
      await browser.sleep(1999).then(function () {
        console.log('sleep 2 index second '+i);
      });
    }
    return true;
  }
  
  async isMoreDataDisplyed(){
    const l=browser.executeScript("return document.getElementsByClassName('sc-ifAKCX dUcegu sc-bdVaJa dXHeyP').length");
    const len=+l;
    if(len>25){
      return true;
    }
    else{
      return false;
    }
  }
  
  
}
