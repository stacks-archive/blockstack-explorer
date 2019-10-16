import { browser, element, by, $, $$, ExpectedConditions, protractor } from 'protractor';
export class BasePage {
    private waitTime = 50000;
    async clickClassButton(className: string, ans: string) {
        ans = ans.trim().toLowerCase();
        await console.log("ANSWER : " + ans);
        let len = 0;
        await element.all(by.className(className)).count().then(function (size) {
            len = size;
        });
        // console.log("Outer  Size : " + len);
        let index;
        for (index = 0; index < len; index++) {
            let str = await element.all(by.className(className)).get(index).getText();
            str = str.trim().toLowerCase();
            // console.log("Index : " + index + "  ans : " + ans);
            // console.log("Str : " + str);
            if (str === ans) {
                console.log("Clicked " + ans+" str is: "+str);
                // await element.all(by.className(className)).get(index).click();
                await browser.executeScript("document.getElementsByClassName('"+className+"')["+index+"].click()");
                return;
            }
        }
        if (index == len) {
            throw "error: Not found";
        }
    }

    async clickId(id: string) {
        await browser.executeScript(`document.getElementById('${id}').click()`)
    }
}