                                                            // --------
                                                            // Library |
                                                            // --------

// -----------------------------------------------
// Function that allows us to quickly grab Xpaths |
// -----------------------------------------------
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Usages
/*
    getElementByXpath(xpath).click()
    getElementByXpath(xpath).value = ""
    getElementByXpath(xpath).textContent = ""
*/

// ---------------------------------------------------------------------
// Function that allows us to wait for Xpath to exist before continuing |
// ---------------------------------------------------------------------
function waitForXPath(xpath) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
            clearInterval(interval);
            clearTimeout(timeout);
            resolve(element);
            }
        }, 100);
    
    const timeout = setTimeout(() => {
        clearInterval(interval);
        reject(new Error(`Timed out waiting for element with xPath: ${xpath}`));
    }, 10000); // 10 second timeout
    });
}
// Usage
/*
    await waitForXPath(xpath)
        .then(element => {
            // Execute code we were waiting for here
        })
        .catch(error => {
            console.log(error)
        });
*/

// -----------------------------------------------------------------------------------------------------------------------
// Function that allows us to type py simulating keypresses - Much more reliable then adjusting value or text/textContent |
// -----------------------------------------------------------------------------------------------------------------------

function type(str, inputField) {
    // Check if the input field is a valid HTML input element
    if (inputField instanceof HTMLInputElement) {
      // Loop through each character in the string
      for (const ch of str) {
        // Dispatch a keydown and keyup event for each character
        inputField.dispatchEvent(new KeyboardEvent('keydown', { key: ch }));
        inputField.dispatchEvent(new KeyboardEvent('keyup', { key: ch }));
  
        // Update the value of the input field
        inputField.value += ch;
      }
    }
  }

  //Usage
  /*
    typeString("Hello, World!", inputField);
  */

                                                                // --------
                                                                // Watcher |
                                                                // --------

function watcher() {
    // If we see a certain webpage, we perform an action, in this case changing an - TODO: MAKE A FOR LOOP THAT EXECUTES THE IF STATEMENT ON A LIST OF URLS SO WE
    //            CAN SCALE THIS TO THOUSANDS OF URLS
    if (window.location.href === 'https://www.tax.ny.gov/') {
        // Appends Automations button to screen
        let button = document.createElement("button");
        button.innerHTML = "Automations Available";
        button.style.position = "fixed";
        button.style.top = 0;
        button.style.right = 0;
        button.style.zIndex = "9999";
        button.id = 'injectedTestButton'
        document.body.appendChild(button);

        // Adds listener for button
        document.getElementById("injectedTestButton").addEventListener('click', function() {
            // TODO: THIS IS CURRENTLY FOR TESTING, BUT THIS SHOULD BE REPLACED WITH AN EVENT EXPANDS A DROPDOWN AND DISPLAYS ONLY THE APPROPRIATE AUTOMATIONS FOR THE
            //          GIVEN MATCHED PAGE
            alert('Click okay to disco!')
            
            getElementByXpath('//*[@id="tax-content"]/div[1]/div/div[1]/p[3]/a').textContent = 'ANDREW DID THIS'

            function changeBackgroundColor() {
                const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
                let index = 0;
                
                setInterval(function() {
                    document.querySelectorAll('.button')[0].style.backgroundColor = colors[index];
                    index = (index + 1) % colors.length;
                }, 175); // Change color every second
                }
            changeBackgroundColor()
        });
    }
}

watcher()

                                                                // ------------
                                                                // Automations |
                                                                // ------------