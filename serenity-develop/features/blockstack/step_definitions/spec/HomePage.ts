import { browser, element, by, By, $, $$, ExpectedConditions, promise, protractor, Key } from 'protractor';
import { BasePage } from '../spec/BasePage';
import { createWriteStream } from 'fs';

const url = process.env.TEST_URL || 'https://staging-explorer.blockstack.xyz';

export class HomePage extends BasePage {
  private callUs = element(by.className("ewXKKG"));
  // constructor(){}
  private idd = element.all(by.className('bqFlkF'));
  private idEnable=element(by.className("dxSyyy"));
  private barcode=element(by.className('cowjLw'));
  private downIcon=element(by.className('hiwGvD'));
  private dateBack=element(by.className('dNUTga'));

  async openHomePage() {
    await browser.waitForAngularEnabled(false);
    await browser.get(`${url}`);
    await browser.sleep(5000);
  }

  async enterNameInSearchBar(name: string) {
    await browser.takeScreenshot().then(function (png) {
      console.log(`Screenshot: ${png}`);
    });
    //console.log(`DEBUG PAGE SOURCE: ${await browser.getPageSource()}`);
    const seachBarXpath = "//input[@placeholder='Search by address, block, name or transaction']";
    await browser.wait(ExpectedConditions.visibilityOf(element(by.xpath(seachBarXpath))), 60000);
    await element(by.xpath(seachBarXpath)).sendKeys(name);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.waitForAngular();
    await browser.sleep(4999);
    console.log('sleep for 5 sec');
  }

  async enterAddressAndPressEnterKey(address: string) {
    await element(by.xpath('//*[@id="__next"]/div[1]/div[1]/form/div[3]/input')).sendKeys(address);
    await  browser.actions().sendKeys(protractor.Key.ENTER).perform();
    await browser.waitForAngular();
    await browser.sleep(4999);
    console.log('sleep for 5 sec');
  }

  async checkInformation(){
    await browser.sleep(15000);
    // await browser.wait(ExpectedConditions.elementToBeClickable(this.callUs),40000);
    // console.log('getting the name')
    await browser.wait(ExpectedConditions.visibilityOf(element(by.id('user-card-name'))), 1000);
    // console.log('got the name')
    // await browser.sleep(3999).then(function () {
    //   console.log('sleep 4 second');
    // });
    // await browser.waitForAngular();
    const l = await browser.executeScript("return document.getElementById('user-card-name').innerText");
    console.log("String is "+l);
    return l;
  }

  async clickOnNameLink(){
    // await this.clickClassButton('sc-bxivhb cRteMP sc-bdVaJa cIgLIY','Names');
    await this.clickId('nav-names');
  }

  async getListheading(){
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    // await browser.wait(ExpectedConditions.elementToBeClickable(this.idEnable),40000);
    await browser.wait(ExpectedConditions.elementToBeClickable(element(by.id('namespaces-side-nav-blockstack'))));
    await browser.sleep(3999).then(function () {
      console.log('sleep 4 second');
    });
    await browser.waitForAngular();
    // const ll= await browser.executeScript("return document.getElementsByClassName('sc-bdVaJa dxSyyy')[0].innerText");
    const namespace = await browser.executeScript(`return document.getElementById('namespaces-side-nav-blockstack').innerText;`);
    console.log("String is " + namespace);
    return namespace;
  }

  async clickOnGivenId(id:string){
    await browser.executeScript("window.scrollBy(0,10000)");
    // await this.clickClassButton('ewXKKG','View More');
    await this.clickId('namespace-names-view-more');
    await browser.waitForAngular();
    await browser.sleep(2999).then(function () {
      console.log('sleep 4 second');
    });
    await this.clickClassButton('names-list-item',id);
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
    const l = await browser.executeScript("return document.getElementById('address-card-address').innerText");
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
    // await browser.waitForAngular();
    console.log('sleep for 5 sec');
    await browser.sleep(10000);
  }

  async getBlockInformation(){

  }

  async openURLForBlock(){
    await browser.waitForAngularEnabled(false);
    await browser.get(`${url}/tx/335b303a711c71130d10b440b0ac42100830e20407e875422f5832437650bb5c`);
  }

  async openURLForBlock2(){
    await browser.waitForAngularEnabled(false);
    await browser.get(`${url}/blocks?date=2019-05-30`);
  }

  async clickOnBlockLink(blockHeight) {
    await browser.sleep(10000);
    console.log(`document.querySelector('[data-block-height="${blockHeight}"]')`);
    await browser.executeScript(`document.querySelector('[data-block-height="${blockHeight}"]').click()`);
  }

  async verifyBlockPage(blockHeight) {
    console.log('sleeping 15 seconds');
    await browser.sleep(15000);
    const height = await browser.executeScript("return document.getElementById('block-card-height').innerText");
    return height;
  }

  async clickOnViewMoreBtn(){
    await browser.executeScript("window.scrollBy(0,10000)");
    await browser.sleep(1999).then(function () {
      console.log('sleep 2 second');
    });
    // await this.clickClassButton('sc-bdVaJa bZXzYB','View More Blocks');
    await this.clickId('view-more-blocks')
    await browser.sleep(10000)
  }

  async clickOnDateBtn(){
    // await browser.executeScript("document.getElementsByClassName('sc-bdVaJa dTlDiF')[0].click()");
    await browser.executeScript("document.getElementById('block-date-yesterday').click()")
    console.log('sleeping 10 seconds')
    await browser.sleep(10000)
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
    const inf = await browser.executeScript("return document.getElementById('block-card-height').innerText");
    console.log("name or address is "+inf);
    return inf;
  }

  async getTxid() {
    await browser.sleep(25000).then(function() {
      console.log('sleep 25 second');
    });
    // await browser.waitForAngular();
    const txid = await browser.executeScript("return document.getElementById('tx-card-txid').innerText");
    return txid;
  }

  async getSearchResultOfTransaction(){
    await browser.sleep(9999).then(function () {
      console.log('sleep 4 second');
    });
    // await browser.wait(ExpectedConditions.elementToBeClickable(this.downIcon),40000);
    // await browser.wait(ExpectedConditions.visibilityOf(this.traInf),40000);
    await browser.sleep(9999).then(function () {
      console.log('sleep 9 second');
    });
    await browser.waitForAngular();
    const inf = await browser.executeScript("return document.getElementById('block-card-height').innerText");
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
    const length = await browser.executeScript("return document.getElementsByClassName('block-list-row').length");
    if(length > 100){
      return true;
    }
    else{
      return false;
    }
  }

  async getTxid() {
    await browser.sleep(25000).then(function() {
      console.log('sleep 25 second');
    });
    // await browser.waitForAngular();
    const txid = await browser.executeScript("return document.getElementById('tx-card-txid').innerText");
    return txid;
  }

  async getSearchResultOfTransaction(){
    await browser.sleep(9999).then(function () {
      console.log('sleep 4 second');
    });
    // await browser.wait(ExpectedConditions.elementToBeClickable(this.downIcon),40000);
    // await browser.wait(ExpectedConditions.visibilityOf(this.traInf),40000);
    await browser.sleep(9999).then(function () {
      console.log('sleep 9 second');
    });
    await browser.waitForAngular();
    const inf = await browser.executeScript("return document.getElementById('block-card-height').innerText");
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
    const length = await browser.executeScript("return document.getElementsByClassName('block-list-row').length");
    if(length > 100){
      return true;
    }
    else{
      return false;
    }
  }
  
  
}
