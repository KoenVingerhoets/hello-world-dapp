var
  name;

// Choose a non-deterministic name because the keys persist in IPFS
// between tests.
name = String(Math.random());

module.exports = {
  before: function (browser) {
    console.log("Testing with name '" + name + "'.");

    browser
      .useXpath()
      .maximizeWindow();
  },

  "Jasmine tests": function (browser) {
    browser
      .url('http://helloworldone:5001/jasmine/SpecRunner.html')
      .waitForElementVisible('//*[contains(@class, "bar")]')

      // This isn't working for some reason so we implement it ourselves.  Maybe
      // we can use it in the future.
      //
      // .getLog('browser', function(logEntriesArray) {
      //     console.log('Log length: ' + logEntriesArray.length);
      //     logEntriesArray.forEach(function(log) {
      //        console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
      //      });
      //   })

      .execute(function () { return window.logArguments; }, [], 
        function (response) {
          console.log("\nBrowser console:\n");

          response.value.forEach(function (entry) {
            console.log.apply(console, entry);
          });
        })

      .assert.containsText('//*[@class="bar passed"]', "0 failures");
  },

  "missing file": function (browser) {
    browser
      .url('http://helloworldone:5001/')
      .waitForElementPresent('//input[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "centralized")
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-error")]')

      .assert.containsText('//*[contains(@class, "ajs-error")]',
        "File not found");
  },

  "add file to one": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', name)
      .setValue('//*[@id="input"]', "http://www.marmotburrow.ucla.edu/index.html")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "File sent! You can now get it by its name.")

      .waitForElementNotPresent('//*[contains(@class, "ajs-success")]');
  },

  "get file from one": function (browser) {
    browser
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html");
  },

  "get file from two": function (browser) {
    browser
      .url('http://helloworldtwo:5001/')
      .waitForElementPresent('//input[@id="filenameGet"]')
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html")
      .waitForElementNotPresent('//*[contains(@class, "ajs-success")]');
  },

  "change file on two": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', name)
      .setValue('//*[@id="input"]', "https://erisindustries.com/")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "File sent! You can now get it by its name.")

      .waitForElementNotPresent('//*[contains(@class, "ajs-success")]');
  },

  "get changed file from two": function (browser) {
    browser
      .url('http://helloworldtwo:5001/')
      .waitForElementPresent('//input[@id="filenameGet"]')
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  "get changed file from one": function (browser) {
    browser
      .url('http://helloworldone:5001/')
      .waitForElementPresent('//input[@id="filenameGet"]')
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]')

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  after: function (browser) {
    browser.end();
  }
};
