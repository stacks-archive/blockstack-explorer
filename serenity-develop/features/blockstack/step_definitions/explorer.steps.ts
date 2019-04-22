import {browser, by, protractor} from 'protractor';
import {HomePage} from './spec/HomePage';
const chai = require('chai');
chai.use(require('chai-as-promised'));

const expect = chai.expect;

module.exports = function myStepDefinitions () {
    const homePage: HomePage = new HomePage();
    this.setDefaultTimeout(60 * 1000);

    this.Given(/^user is on home page$/, async ()=> {
        homePage.openHomePage();
      });
      this.Then('user enter the name in search bar', async ()=> {
        await homePage.enterNameInSearchBar("aaronbailey.id");
    });
    this.Then('Verify that explorer returns information related to name', async ()=> {
       const l =await homePage.checkInformation();
       console.log('String 2 :'+l);
        await expect('aaronbailey.id').to.equal(l);
        //  expect.to.be(homePage.checkInformation()).to.eventually.equal("What do my test results mean?");
    });

    this.Given('user select the Name link',async()=> {
        await homePage.clickOnNameLink();
      });

    this.Then('verify that list of all the names is displayed', async()=> {
        await homePage.getListheading();
        //add assertion
    });
    this.Then(/^user select the id "([^"]*)"$/, async(arg1)=> {
        await homePage.clickOnGivenId(arg1);
      });

      this.Then(/^Verify that "([^"]*)" information has displayed$/, async (arg1)=> {
        const inf=await homePage.checkInformation();
        console.log('String id :'+inf);
        await expect(arg1).to.equal(inf);
    
      });
    
    
    this.Then('Verify that explorer returns information related to address', async ()=> {
        const addr=await homePage.checkAddressInformation();
        console.log('String addr :'+addr);
        await expect('1NHfjtfnTdnPSwFveHMrG5P3PNKM2s3qnV').to.equal(addr);
      });
      this.Then('user search the address in address search bar', async () =>{
        await homePage.enterAddressAndPressEnterKey("1NHfjtfnTdnPSwFveHMrG5P3PNKM2s3qnV");
      });

    this.Given(/^user open the url$/, async()=> {
        await homePage.openURL();
    });
    this.Given(/^click on the address link "([^"]*)"$/, async (arg1)=> {
        await homePage.clickOnAddressLink(arg1);
    });
    this.Then(/^Verify that information of selected address has displayed$/, async ()=> {
        // await homePage.checkAddressInformation();
        const addr=await homePage.checkAddressInformation();
        console.log('String addr :'+addr);
        await expect('1NHfjtfnTdnPSwFveHMrG5P3PNKM2s3qnV').to.equal(addr);
        
    });
    this.Then('enter the block number and press enter key in search bar', async()=> {
        await homePage.enterBlockNumber("523746");
      });
    this.Then('Verify that inforation has shown related to search block number', async()=> {
        // await homePage.checkAddressInformation();
        const inf= await homePage.getSearchResultOfBlock();
        console.log("information box "+inf);
        expect(inf).to.include('523746');
    });  

    this.Given(/^user open url$/, async () =>{
        await homePage.openURLForBlock();
    });

    this.Then(/^Verify that Explorer returns information for the entered transaction number$/, async () =>{
        const inf= await homePage.getSearchResultOfBlock();
        console.log("information box "+inf);
        expect(inf).to.include('569896');
      });
    
    this.Then('enter transaction number', async()=> {
        //await homePage.enterTransactionNumber("335b303a711c71130d10b440b0ac42100830e20407e875422f5832437650bb5c");
        await homePage.enterBlockNumber("335b303a711c71130d10b440b0ac42100830e20407e875422f5832437650bb5c");
    });

    this.Then(/^verify Explorer returns the information for the entered transaction number$/, async ()=> {
        //add assertion failed defect
        const inf= await homePage.getSearchResultOfBlock();
        console.log("information box "+inf);
        expect(inf).to.include('335b303a711c71130d10b440b0ac42100830e20407e875422f5832437650bb5c');
    });
    this.Given(/^user open the block url$/, async ()=> {
        await homePage.openURLForBlock2();
      });

    this.Given(/^scroll down page and click on view more block button$/, async ()=> {
        await homePage.clickOnViewMoreBtn();
    });

    this.Then(/^Verify that more data has displayed$/, async ()=> {
    const bool=await homePage.isMoreDataDisplyed();
    await expect(true).to.equal(bool);
    });

    this.Then(/^click on date button$/, async ()=> {
        homePage.clickOnDateBtn();
      });
    this.Then(/^verify that yesterdays date and todays date shows$/, async ()=> {
        //add assertion
    });
    
      this.Then(/^verify That user is able to click it until they are one week from todays date$/, async ()=> {
        const bool =await homePage.clicksOnDateButtonBack();
        await expect(true).to.equal(bool);
      });
};
